import { ChainEnv } from '@vertex-protocol/contracts';

export const TRIGGER_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'http://localhost:80/trigger',
  arbitrumTestnet: 'https://trigger.sepolia-test.vertexprotocol.com/v1',
  blastTestnet: 'https://trigger.blast-test.vertexprotocol.com/v1',
  arbitrum: 'https://trigger.prod.vertexprotocol.com/v1',
  blast: 'https://trigger.blast-prod.vertexprotocol.com/v1',
  mantleTestnet: 'https://trigger.mantle-test.vertexprotocol.com/v1',
  mantle: 'https://trigger.mantle-prod.vertexprotocol.com/v1',
};
