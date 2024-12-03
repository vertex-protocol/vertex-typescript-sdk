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
};
