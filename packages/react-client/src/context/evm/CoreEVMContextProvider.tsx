import { ChainEnv } from '@vertex-protocol/client';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from 'wagmi';
import { getChainMetadata } from '../../utils';
import { EVMContext } from './EVMContext';
import { useDidInitializeWalletConnection, useEthersSigner } from './hooks';
import {
  ChainStatus,
  ConnectionStatus,
  EVMContextData,
  WagmiConfigParams,
} from './types';
import { getPrimaryChain } from './utils';

export interface CoreEVMContextProviderProps {
  children: ReactNode;
  primaryChainEnv: ChainEnv | undefined;
  setPrimaryChainEnv: (chainEnv: ChainEnv) => void;
  supportedChainEnvs: ChainEnv[];
  supportedChains: WagmiConfigParams['supportedChains'];
}

/**
 * Core context logic. Do not use this directly, instead use EVMContextProvider
 * which wraps this provider within the necessary Wagmi context
 */
export function CoreEVMContextProvider({
  primaryChainEnv: basePrimaryChainEnv,
  setPrimaryChainEnv: setBasePrimaryChainEnv,
  supportedChainEnvs,
  supportedChains,
  children,
}: CoreEVMContextProviderProps) {
  const primaryChainEnv = useMemo((): ChainEnv => {
    // Failsafe check - if localstorage has an invalid value, just default to the first supported env
    if (
      basePrimaryChainEnv &&
      supportedChainEnvs.includes(basePrimaryChainEnv)
    ) {
      return basePrimaryChainEnv;
    }
    return supportedChainEnvs[0];
  }, [basePrimaryChainEnv, supportedChainEnvs]);

  const primaryChain = useMemo(() => {
    return getPrimaryChain(primaryChainEnv);
  }, [primaryChainEnv]);

  const didInitializeWalletConnection = useDidInitializeWalletConnection();
  // Wagmi does not give access to the active connector in the `connecting` state, so we store this state separately
  const [lastConnectRequestConnector, setLastConnectRequestConnector] =
    useState<Connector>();
  const [readOnlyAddressOverride, setReadOnlyAddressOverride] = useState('');

  const primaryChainId = primaryChain.id;
  // We don't specify a `chainId` here because we want to use the active chain of the connected wallet
  // This is useful in bridging workflows where the user would be on a different chain than the primary chain
  const signer = useEthersSigner();

  const {
    switchChain: baseSwitchChain,
    error: switchChainError,
    isPending: isSwitchingChain,
  } = useSwitchChain();

  const {
    address: connectedAddress,
    status: connectedAccountStatus,
    connector: activeConnector,
    chain: connectedChain,
  } = useAccount();

  const { disconnect } = useDisconnect();
  const { connect: baseConnect, connectors } = useConnect();

  const connect = useCallback(
    (connector: Connector) => {
      setLastConnectRequestConnector(connector);
      baseConnect({
        // Specifying chain ID here is useful for WalletConnect, which can request connection for the specified chain
        // For some wallets, chain switching will be prompted automatically on connect
        chainId: primaryChainId,
        connector,
      });
    },
    [baseConnect, primaryChainId],
  );

  /**
   * Derives the current connection state
   */
  const connectionStatus = useMemo((): ConnectionStatus => {
    const exposedAddress = readOnlyAddressOverride
      ? readOnlyAddressOverride
      : connectedAddress;

    if (connectedAccountStatus === 'connected' && exposedAddress) {
      return {
        type: 'connected',
        connector: activeConnector,
        address: exposedAddress,
        signer,
      };
    }
    if (connectedAccountStatus === 'reconnecting') {
      return {
        type: 'reconnecting',
        connector: activeConnector,
        address: undefined,
        signer: undefined,
      };
    }
    if (connectedAccountStatus === 'connecting') {
      return {
        type: 'connecting',
        connector: lastConnectRequestConnector,
        address: undefined,
        signer: undefined,
      };
    }

    return {
      type: didInitializeWalletConnection ? 'disconnected' : 'initializing',
      connector: activeConnector,
      address: undefined,
      signer: undefined,
    };
  }, [
    readOnlyAddressOverride,
    connectedAddress,
    connectedAccountStatus,
    didInitializeWalletConnection,
    activeConnector,
    signer,
    lastConnectRequestConnector,
  ]);

  /**
   * Derive connected chain status
   */
  const chainStatus: ChainStatus = useMemo(() => {
    let statusType: ChainStatus['type'] = 'idle';
    if (isSwitchingChain) {
      statusType = 'switching';
    } else if (switchChainError) {
      statusType = 'switch_error';
    }

    return {
      type: statusType,
      isIncorrectChain:
        connectedAccountStatus === 'connected' &&
        connectedChain?.id !== primaryChain.id,
      connectedChain,
    };
  }, [
    isSwitchingChain,
    switchChainError,
    connectedAccountStatus,
    connectedChain,
    primaryChain.id,
  ]);

  const switchChain = useCallback(
    (chainId?: number) => {
      baseSwitchChain?.({
        chainId: chainId ?? primaryChain.id,
      });
    },
    [baseSwitchChain, primaryChain.id],
  );

  const setPrimaryChainEnv = useCallback(
    (chainEnv: ChainEnv) => {
      setBasePrimaryChainEnv(chainEnv);
      // Prompt user to switch onto the new primary chain
      switchChain(getPrimaryChain(chainEnv).id);
    },
    [setBasePrimaryChainEnv, switchChain],
  );

  const evmContextData = useMemo((): EVMContextData => {
    return {
      primaryChainEnv,
      setPrimaryChainEnv,
      primaryChain,
      primaryChainMetadata: getChainMetadata(primaryChain),
      supportedChains,
      supportedChainEnvs,
      chainStatus,
      connectors,
      connectionStatus,
      connect,
      disconnect,
      switchChain,
      readOnlyAddressOverride,
      setReadOnlyAddressOverride,
    };
  }, [
    primaryChainEnv,
    setPrimaryChainEnv,
    primaryChain,
    supportedChains,
    supportedChainEnvs,
    chainStatus,
    connectors,
    connectionStatus,
    connect,
    disconnect,
    switchChain,
    readOnlyAddressOverride,
  ]);

  return (
    <EVMContext.Provider value={evmContextData}>{children}</EVMContext.Provider>
  );
}
