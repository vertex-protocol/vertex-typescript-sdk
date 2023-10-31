import { ChainEnv } from '@vertex-protocol/contracts';

export const ENGINE_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'http://localhost:80',
  testnet: 'https://gateway.test.vertexprotocol.com/v1',
  mainnet: 'https://api.prod.vertexprotocol.com',
};

export const ENGINE_WS_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'ws://localhost:80',
  testnet: 'wss://gateway.test.vertexprotocol.com/v1/ws',
  mainnet: 'wss://api.prod.vertexprotocol.com/ws',
};

export const ENGINE_WS_SUBSCRIPTION_CLIENT_ENDPOINTS: Record<ChainEnv, string> =
  {
    local: 'ws://localhost:80',
    testnet: 'wss://gateway.test.vertexprotocol.com/v1/subscribe',
    mainnet: 'wss://api.prod.vertexprotocol.com/subscribe',
  };
