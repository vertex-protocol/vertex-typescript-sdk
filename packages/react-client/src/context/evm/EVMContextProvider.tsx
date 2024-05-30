import { ChainEnv } from '@vertex-protocol/client';
import { ReactNode, useMemo } from 'react';
import { WagmiProvider } from 'wagmi';
import { CoreEVMContextProvider } from './CoreEVMContextProvider';
import { EVMContextParams } from './types';
import { getWagmiConfig } from './utils';

interface Props extends EVMContextParams {
  children: ReactNode;
  // This defaults to the first supported chain env if not provided
  primaryChainEnv: ChainEnv | undefined;
  setPrimaryChainEnv: (chainEnv: ChainEnv) => void;
}

export function EVMContextProvider({
  supportedChainEnvs,
  primaryChainEnv: basePrimaryChainEnv,
  setPrimaryChainEnv,
  supportedChains,
  connectorOptions,
  children,
}: Props) {
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

  const wagmiConfig = useMemo(() => {
    return getWagmiConfig({
      supportedChains,
      connectorOptions,
    });
  }, [connectorOptions, supportedChains]);

  return (
    <WagmiProvider config={wagmiConfig}>
      <CoreEVMContextProvider
        supportedChainEnvs={supportedChainEnvs}
        supportedChains={supportedChains}
        primaryChainEnv={primaryChainEnv}
        setPrimaryChainEnv={setPrimaryChainEnv}
      >
        {children}
      </CoreEVMContextProvider>
    </WagmiProvider>
  );
}
