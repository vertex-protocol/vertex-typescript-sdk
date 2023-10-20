import { ChainEnv } from '@vertex-protocol/contracts';

export const ENGINE_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'http://localhost:80',
  testnet: 'https://api.test.vertexprotocol.com',
  mainnet: 'https://api.prod.vertexprotocol.com',
};

export const ENGINE_WS_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'ws://localhost:80',
  testnet: 'wss://api.test.vertexprotocol.com/ws',
  mainnet: 'wss://api.prod.vertexprotocol.com/ws',
};

export const ENGINE_WS_SUBSCRIPTION_CLIENT_ENDPOINTS: Record<ChainEnv, string> =
  {
    local: 'ws://localhost:80',
    testnet: 'wss://api.test.vertexprotocol.com/subscribe',
    mainnet: 'wss://api.prod.vertexprotocol.com/subscribe',
  };
