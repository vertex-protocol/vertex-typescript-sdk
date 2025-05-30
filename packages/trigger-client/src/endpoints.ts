import { ChainEnv } from '@vertex-protocol/contracts';

export const TRIGGER_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'http://localhost:80/trigger',
  arbitrumTestnet: 'https://trigger.sepolia-test.vertexprotocol.com/v1',
  blastTestnet: 'https://trigger.blast-test.vertexprotocol.com/v1',
  arbitrum: 'https://trigger.prod.vertexprotocol.com/v1',
  blast: 'https://trigger.blast-prod.vertexprotocol.com/v1',
  mantleTestnet: 'https://trigger.mantle-test.vertexprotocol.com/v1',
  mantle: 'https://trigger.mantle-prod.vertexprotocol.com/v1',
  seiTestnet: 'https://trigger.sei-test.vertexprotocol.com/v1',
  sei: 'https://trigger.sei-prod.vertexprotocol.com/v1',
  baseTestnet: 'https://trigger.base-test.vertexprotocol.com/v1',
  base: 'https://trigger.base-prod.vertexprotocol.com/v1',
  sonicTestnet: 'https://trigger.sonic-test.vertexprotocol.com/v1',
  sonic: 'https://trigger.sonic-prod.vertexprotocol.com/v1',
  beraTestnet: 'https://trigger.bera-test.vertexprotocol.com/v1',
  abstractTestnet: 'https://trigger.abstract-test.vertexprotocol.com/v1',
  abstract: 'https://trigger.abstract-prod.vertexprotocol.com/v1',
  bera: 'https://trigger.bera-prod.vertexprotocol.com/v1',
  avaxTestnet: 'https://trigger.avax-test.vertexprotocol.com/v1',
  avax: 'https://trigger.avax-prod.vertexprotocol.com/v1',
  xrplTestnet: 'https://trigger.xrpl-test.vertexprotocol.com/v1',
};
