import { ChainEnv } from '@vertex-protocol/contracts';

export const ENGINE_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'http://localhost:80',
  arbitrumTestnet: 'https://gateway.sepolia-test.vertexprotocol.com/v1',
  blastTestnet: 'https://gateway.blast-test.vertexprotocol.com/v1',
  arbitrum: 'https://gateway.prod.vertexprotocol.com/v1',
  blast: 'https://gateway.blast-prod.vertexprotocol.com/v1',
  mantleTestnet: 'https://gateway.mantle-test.vertexprotocol.com/v1',
  mantle: 'https://gateway.mantle-prod.vertexprotocol.com/v1',
  seiTestnet: 'https://gateway.sei-test.vertexprotocol.com/v1',
  sei: 'https://gateway.sei-prod.vertexprotocol.com/v1',
};

export const ENGINE_WS_CLIENT_ENDPOINTS: Record<ChainEnv, string> = {
  local: 'ws://localhost:80',
  arbitrumTestnet: 'wss://gateway.sepolia-test.vertexprotocol.com/v1/ws',
  blastTestnet: 'wss://gateway.blast-test.vertexprotocol.com/v1/ws',
  arbitrum: 'wss://gateway.prod.vertexprotocol.com/v1/ws',
  blast: 'wss://gateway.blast-prod.vertexprotocol.com/v1/ws',
  mantleTestnet: 'wss://gateway.mantle-test.vertexprotocol.com/v1/ws',
  mantle: 'wss://gateway.mantle-prod.vertexprotocol.com/v1/ws',
  seiTestnet: 'wss://gateway.sei-test.vertexprotocol.com/v1/ws',
  sei: 'wss://gateway.sei-prod.vertexprotocol.com/v1/ws',
};

export const ENGINE_WS_SUBSCRIPTION_CLIENT_ENDPOINTS: Record<ChainEnv, string> =
  {
    local: 'ws://localhost:80',
    arbitrumTestnet:
      'wss://gateway.sepolia-test.vertexprotocol.com/v1/subscribe',
    blastTestnet: 'wss://gateway.blast-test.vertexprotocol.com/v1/subscribe',
    arbitrum: 'wss://gateway.prod.vertexprotocol.com/v1/subscribe',
    blast: 'wss://gateway.blast-prod.vertexprotocol.com/v1/subscribe',
    mantleTestnet: 'wss://gateway.mantle-test.vertexprotocol.com/v1/subscribe',
    mantle: 'wss://gateway.mantle-prod.vertexprotocol.com/v1/subscribe',
    seiTestnet: 'wss://gateway.sei-test.vertexprotocol.com/v1/subscribe',
    sei: 'wss://gateway.sei-prod.vertexprotocol.com/v1/subscribe',
  };
