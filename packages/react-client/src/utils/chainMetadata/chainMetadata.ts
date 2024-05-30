import { Chain } from 'viem';
import { ChainType, getChainType } from './chainType';

export interface ChainMetadata {
  chainType: ChainType;
  isTestnet: boolean;
}

export function getChainMetadata(chain: Chain): ChainMetadata {
  const chainType = getChainType(chain);

  return {
    isTestnet: chain.testnet ?? false,
    chainType,
  };
}
