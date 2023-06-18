import { ChainEnv } from './types';
import { Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';

export function getProvider(chainEnv: ChainEnv): Provider {
  switch (chainEnv) {
    case 'local':
      return new ethers.providers.JsonRpcProvider();
    case 'testnet':
      return new ethers.providers.StaticJsonRpcProvider(
        'https://goerli-rollup.arbitrum.io/rpc',
        {
          name: 'arbitrum-goerli',
          chainId: 421613,
        },
      );
    case 'mainnet':
      return new ethers.providers.StaticJsonRpcProvider(
        'https://arb1.arbitrum.io/rpc',
        {
          name: 'arbitrum-one',
          chainId: 42161,
        },
      );
  }
}
