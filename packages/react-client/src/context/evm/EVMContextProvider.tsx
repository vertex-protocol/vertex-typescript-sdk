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
  primaryChainEnv,
  setPrimaryChainEnv,
  supportedChains,
  connectorOptions,
  children,
}: Props) {
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
