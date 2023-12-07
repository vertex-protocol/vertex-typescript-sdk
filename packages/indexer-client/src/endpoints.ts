import { ChainEnv } from '@vertex-protocol/contracts';

export const INDEXER_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'http://localhost:8000/indexer',
  testnet: 'https://archive.sepolia-test.vertexprotocol.com/v1',
  mantleTestnet: 'https://archive.mantle-test.vertexprotocol.com/v1',
  mainnet: 'https://archive.prod.vertexprotocol.com/v1',
};
