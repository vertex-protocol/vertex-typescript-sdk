import { ChainEnv } from '@vertex-protocol/client';
import {
  arbitrum,
  arbitrumSepolia,
  blast,
  blastSepolia,
  localhost,
  mantle,
  mantleSepoliaTestnet,
} from 'wagmi/chains';
import { PrimaryChain } from '../../../types';

export function getPrimaryChain(chainEnv: ChainEnv): PrimaryChain {
  switch (chainEnv) {
    case 'local':
      return localhost;
    case 'arbitrumTestnet':
      return arbitrumSepolia;
    case 'mantleTestnet':
      return mantleSepoliaTestnet;
    case 'blastTestnet':
      return blastSepolia;
    case 'arbitrum':
      return arbitrum;
    case 'mantle':
      return mantle;
    case 'blast':
      return blast;
  }
}
