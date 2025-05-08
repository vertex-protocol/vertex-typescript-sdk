import { defineChain } from 'viem';

/**
 * Katana testnet with a defined multicall contract
 */
export const katanaTestnet = defineChain({
  id: 129_399,
  name: 'Tatara Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    // TODO: this RPC URL is not working, blocked until we have a working one
    default: { http: ['https://rpc.tatara.katanarpc.com'] },
  },
  blockExplorers: {
    default: {
      name: 'Katara Testnet Explorer',
      url: 'https://explorer.tatara.katana.network',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 0,
    },
  },
  testnet: true,
});
