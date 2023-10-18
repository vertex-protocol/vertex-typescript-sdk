import { ChainEnv } from '@vertex-protocol/contracts';

export const INDEXER_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'http://localhost:8000/indexer',
  testnet: 'https://api.arbitrum-goerli.vertexprotocol.com/indexer',
  mainnet: 'https://prod.vertexprotocol-backend.com/indexer',
};
