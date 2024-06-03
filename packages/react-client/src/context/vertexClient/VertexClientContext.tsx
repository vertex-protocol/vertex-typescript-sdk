import { ChainEnv } from '@vertex-protocol/client';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useEVMContext } from '../evm';
import { useVertexClientsQuery } from './hooks/useVertexClientsQuery';
import {
  VertexClientSetLinkedSignerParams,
  VertexClientWithMetadata,
} from './types';

interface Props {
  children: ReactNode;
}

interface VertexClientContextData {
  // Instance of VertexClient on the current primary chain
  primaryChainVertexClient: VertexClientWithMetadata | undefined;
  vertexClientsByChainEnv:
    | Record<ChainEnv, VertexClientWithMetadata>
    | undefined;

  // Updates the 1CT signer on the relevant vertex client
  setLinkedSigner(params: VertexClientSetLinkedSignerParams): void;
}

const VertexClientContext = createContext<VertexClientContextData>(
  {} as VertexClientContextData,
);

export const useVertexClientContext = () => useContext(VertexClientContext);

export function VertexClientContextProvider({ children }: Props) {
  const {
    primaryChainEnv,
    supportedChainEnvs,
    connectionStatus: { signer },
    chainStatus: { connectedChain },
  } = useEVMContext();

  const { vertexClientsByChainEnv } = useVertexClientsQuery({
    signer,
    signerChainId: connectedChain?.id,
    supportedChainEnvs,
  });

  const setLinkedSigner = useCallback(
    ({ signer, chainEnv }: VertexClientSetLinkedSignerParams) => {
      vertexClientsByChainEnv?.[chainEnv]?.client.setLinkedSigner(signer);
    },
    [vertexClientsByChainEnv],
  );

  const data: VertexClientContextData = useMemo(() => {
    return {
      primaryChainVertexClient: vertexClientsByChainEnv?.[primaryChainEnv],
      vertexClientsByChainEnv,
      setLinkedSigner,
    };
  }, [primaryChainEnv, setLinkedSigner, vertexClientsByChainEnv]);

  return (
    <VertexClientContext.Provider value={data}>
      {children}
    </VertexClientContext.Provider>
  );
}
