import { defineChain } from 'viem';

/**
 * Sonic testnet with a defined multicall contract
 */
export const sonicTestnet = defineChain({
  id: 57_054,
  name: 'Sonic Blaze Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Sonic',
    symbol: 'S',
  },
  rpcUrls: {
    default: { http: ['https://rpc.blaze.soniclabs.com'] },
  },
  blockExplorers: {
    default: {
      name: 'Sonic Testnet Explorer',
      url: 'https://testnet.soniclabs.com/',
    },
  },
  contracts: {
    multicall3: {
      address: '0x6FDAd85621b738a4258883559B0fa0228F6d8445',
      blockCreated: 897325,
    },
  },
  testnet: true,
});
