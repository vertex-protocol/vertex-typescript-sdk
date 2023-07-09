import { ChainEnv } from './types';
import { JsonRpcProvider, Provider } from 'ethers';

export function getProvider(chainEnv: ChainEnv): Provider {
  switch (chainEnv) {
    case 'local':
      return new JsonRpcProvider();
    case 'testnet':
      return new JsonRpcProvider('https://goerli-rollup.arbitrum.io/rpc', {
        name: 'arbitrum-goerli',
        chainId: 421613,
      });
    case 'mainnet':
      return new JsonRpcProvider('https://arb1.arbitrum.io/rpc', {
        name: 'arbitrum-one',
        chainId: 42161,
      });
  }
}
