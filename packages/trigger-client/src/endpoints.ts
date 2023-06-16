import { ChainEnv } from '@vertex-protocol/contracts';

export const TRIGGER_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'http://localhost:80/trigger',
  testnet: 'https://test.vertexprotocol-backend.com/trigger',
  mainnet: 'https://prod.vertexprotocol-backend.com/trigger',
};
