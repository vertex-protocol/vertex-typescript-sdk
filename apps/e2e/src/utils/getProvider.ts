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
        chainId: 1685877734,
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
  }
}
