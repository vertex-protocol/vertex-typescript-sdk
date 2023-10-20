import { ChainEnv } from '@vertex-protocol/contracts';

export const TRIGGER_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'http://localhost:80/trigger',
  testnet: 'https://api.test.vertexprotocol.com/trigger',
  mainnet: 'https://api.prod.vertexprotocol.com/trigger',
};
