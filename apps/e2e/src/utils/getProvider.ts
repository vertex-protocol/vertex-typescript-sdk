import { ChainEnv } from '@vertex-protocol/contracts';
import { JsonRpcProvider, Provider } from 'ethers';

export function getProvider(chainEnv: ChainEnv): Provider {
  switch (chainEnv) {
    case 'local':
      return new JsonRpcProvider();
    case 'testnet':
      return new JsonRpcProvider('https://sepolia-rollup.arbitrum.io/rpc', {
        name: 'arbitrum-sepolia',
        chainId: 421614,
      });
    case 'mainnet':
      return new JsonRpcProvider('https://arb1.arbitrum.io/rpc', {
        name: 'arbitrum-one',
        chainId: 42161,
      });
    case 'blastTestnet':
      return new JsonRpcProvider('https://sepolia.blast.io', {
        name: 'blast-sepolia',
        chainId: 1685877734,
      });
    case 'blastMainnet':
      // TODO: Mainnet details
      return new JsonRpcProvider('https://sepolia.blast.io', {
        name: 'blast',
        chainId: 1685877734,
      });
  }
}
