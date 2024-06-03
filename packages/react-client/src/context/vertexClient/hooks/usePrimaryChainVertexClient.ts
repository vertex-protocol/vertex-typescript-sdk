import { useVertexClientContext } from '../VertexClientContext';

/**
 * Utility fn that returns the Vertex client instance for the currently selected chain env
 */
export function usePrimaryChainVertexClient() {
  const { primaryChainVertexClient } = useVertexClientContext();

  return primaryChainVertexClient?.client;
}
