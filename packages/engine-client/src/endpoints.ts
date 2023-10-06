import { ChainEnv } from '@vertex-protocol/contracts';

export const ENGINE_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'http://localhost:80',
  testnet: 'https://api.arbitrum-goerli.vertexprotocol.com',
  mainnet: 'https://prod.vertexprotocol-backend.com',
};

export const ENGINE_WS_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'ws://localhost:80',
  testnet: 'wss://test.vertexprotocol-backend.com/ws',
  mainnet: 'wss://prod.vertexprotocol-backend.com/ws',
};

export const ENGINE_WS_SUBSCRIPTION_CLIENT_ENDPOINTS: Record<ChainEnv, string> =
  {
    local: 'ws://localhost:80',
    testnet: 'wss://test.vertexprotocol-backend.com/subscribe',
    mainnet: 'wss://prod.vertexprotocol-backend.com/subscribe',
  };
