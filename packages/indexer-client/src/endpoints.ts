import { ChainEnv } from '@vertex-protocol/contracts';

export const INDEXER_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'http://localhost:8000/indexer',
  arbitrumTestnet: 'https://archive.sepolia-test.vertexprotocol.com/v1',
  blastTestnet: 'https://archive.blast-test.vertexprotocol.com/v1',
  arbitrum: 'https://archive.prod.vertexprotocol.com/v1',
  blast: 'https://archive.blast-prod.vertexprotocol.com/v1',
  mantleTestnet: 'https://archive.mantle-test.vertexprotocol.com/v1',
  mantle: 'https://archive.mantle-prod.vertexprotocol.com/v1',
};
