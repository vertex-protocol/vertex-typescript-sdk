import { ChainEnv } from '@vertex-protocol/client';
import { ReactNode, useMemo } from 'react';
import { State as WagmiState, WagmiProvider } from 'wagmi';
import { CoreEVMContextProvider } from './CoreEVMContextProvider';
import { EVMContextParams } from './types';
import { getWagmiConfig } from './utils';

interface Props extends EVMContextParams {
  children: ReactNode;
  initialState?: WagmiState;
  // This defaults to the first supported chain env if not provided
  primaryChainEnv: ChainEnv | undefined;
  setPrimaryChainEnv: (chainEnv: ChainEnv) => void;
}

export function EVMContextProvider({
  supportedChainEnvs,
  primaryChainEnv,
  setPrimaryChainEnv,
  supportedChains,
  connectorOptions,
  storage,
  initialState,
  children,
}: Props) {
  const wagmiConfig = useMemo(() => {
    return getWagmiConfig({
      supportedChains,
      connectorOptions,
      storage,
    });
  }, [connectorOptions, storage, supportedChains]);

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
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
