import { ChainEnv } from '@vertex-protocol/contracts';

export const TRIGGER_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'http://localhost:80/trigger',
  testnet: 'https://trigger.sepolia-test.vertexprotocol.com/v1',
  blastTestnet: 'https://trigger.blast-test.vertexprotocol.com/v1',
  mainnet: 'https://trigger.prod.vertexprotocol.com/v1',
  blastMainnet: 'https://trigger.blast-prod.vertexprotocol.com/v1',
};
