import { ChainEnv } from '@vertex-protocol/contracts';

export const INDEXER_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'http://localhost:8000/indexer',
  arbitrumTestnet: 'https://archive.sepolia-test.vertexprotocol.com/v1',
  blastTestnet: 'https://archive.blast-test.vertexprotocol.com/v1',
  arbitrum: 'https://archive.prod.vertexprotocol.com/v1',
  blast: 'https://archive.blast-prod.vertexprotocol.com/v1',
  mantleTestnet: 'https://archive.mantle-test.vertexprotocol.com/v1',
  mantle: 'https://archive.mantle-prod.vertexprotocol.com/v1',
  seiTestnet: 'https://archive.sei-test.vertexprotocol.com/v1',
  sei: 'https://archive.sei-prod.vertexprotocol.com/v1',
  baseTestnet: 'https://archive.base-test.vertexprotocol.com/v1',
  base: 'https://archive.base-prod.vertexprotocol.com/v1',
  sonicTestnet: 'https://archive.sonic-test.vertexprotocol.com/v1',
  sonic: 'https://archive.sonic-prod.vertexprotocol.com/v1',
  beraTestnet: 'https://archive.bera-test.vertexprotocol.com/v1',
  abstractTestnet: 'https://archive.abstract-test.vertexprotocol.com/v1',
  abstract: 'https://archive.abstract-prod.vertexprotocol.com/v1',
  bera: 'https://archive.bera-prod.vertexprotocol.com/v1',
  avaxTestnet: 'https://archive.avax-test.vertexprotocol.com/v1',
  avax: 'https://archive.avax-prod.vertexprotocol.com/v1',
  xrplTestnet: 'https://archive.xrpl-test.vertexprotocol.com/v1',
};
