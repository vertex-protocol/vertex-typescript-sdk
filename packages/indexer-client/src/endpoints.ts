import { ChainEnv } from '@vertex-protocol/contracts';

export const INDEXER_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'http://localhost:80/indexer',
  testnet: 'https://test.vertexprotocol-backend.com/indexer',
  mainnet: 'https://prod.vertexprotocol-backend.com/indexer',
};
