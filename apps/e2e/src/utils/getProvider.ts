import { ChainEnv } from '@vertex-protocol/contracts';
import { JsonRpcProvider, Provider } from 'ethers';

export function getProvider(chainEnv: ChainEnv): Provider {
  switch (chainEnv) {
    case 'local':
      return new JsonRpcProvider();
    case 'arbitrumTestnet':
      return new JsonRpcProvider('https://sepolia-rollup.arbitrum.io/rpc', {
        name: 'arbitrum-sepolia',
        chainId: 421614,
      });
    case 'arbitrum':
      return new JsonRpcProvider('https://arb1.arbitrum.io/rpc', {
        name: 'arbitrum-one',
        chainId: 42161,
      });
    case 'blastTestnet':
      return new JsonRpcProvider('https://sepolia.blast.io', {
        name: 'blast-sepolia',
        chainId: 168587773,
      });
    case 'blast':
      return new JsonRpcProvider('https://rpc.blast.io', {
        name: 'blast',
        chainId: 81457,
      });
    case 'mantleTestnet':
      return new JsonRpcProvider('https://rpc.sepolia.mantle.xyz', {
        name: 'mantle-sepolia',
        chainId: 5003,
      });
    case 'mantle':
      return new JsonRpcProvider('https://rpc.mantle.xyz', {
        name: 'mantle',
        chainId: 5000,
      });
    case 'seiTestnet':
      return new JsonRpcProvider('https://evm-rpc-testnet.sei-apis.com', {
        name: 'sei-testnet',
        chainId: 1328,
      });
    case 'sei':
      return new JsonRpcProvider('https://evm-rpc.sei-apis.com', {
        name: 'sei',
        chainId: 1329,
      });
    case 'baseTestnet':
      return new JsonRpcProvider('https://sepolia.base.org', {
        name: 'base-sepolia',
        chainId: 84532,
      });
    case 'base':
      return new JsonRpcProvider('https://mainnet.base.org', {
        name: 'base',
        chainId: 8453,
      });
    case 'sonicTestnet':
      return new JsonRpcProvider('https://rpc.blaze.soniclabs.com', {
        name: 'sonic-testnet',
        chainId: 57054,
      });
  }
}
