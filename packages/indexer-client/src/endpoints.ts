import { ChainEnv } from '@vertex-protocol/contracts';

export const INDEXER_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'http://localhost:8000/indexer',
  testnet: 'https://archive.test.vertexprotocol.com/v1',
  mainnet: 'https://api.prod.vertexprotocol.com/indexer',
};
