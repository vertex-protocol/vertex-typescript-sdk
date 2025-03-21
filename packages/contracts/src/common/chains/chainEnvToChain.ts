import { Chain } from 'viem';
import {
  abstract,
  abstractTestnet,
  arbitrum,
  arbitrumSepolia,
  avalanche,
  avalancheFuji,
  base,
  baseSepolia,
  berachain,
  berachainTestnetbArtio,
  blast,
  blastSepolia,
  localhost,
  mantle,
  mantleSepoliaTestnet,
  sei,
  seiTestnet,
  sonic,
} from 'viem/chains';
import { ChainEnv } from '../types';
import { sonicTestnet } from './sonicTestnet';

export const CHAIN_ENV_TO_CHAIN = {
  local: localhost,
  arbitrumTestnet: arbitrumSepolia,
  mantleTestnet: mantleSepoliaTestnet,
  blastTestnet: blastSepolia,
  arbitrum: arbitrum,
  mantle: mantle,
  blast: blast,
  seiTestnet: seiTestnet,
  sei: sei,
  baseTestnet: baseSepolia,
  base: base,
  sonicTestnet: sonicTestnet,
  sonic: sonic,
  beraTestnet: berachainTestnetbArtio,
  bera: berachain,
  abstractTestnet: abstractTestnet,
  abstract: abstract,
  avaxTestnet: avalancheFuji,
  avax: avalanche,
} as const satisfies Record<ChainEnv, Chain>;

export const CHAIN_ID_TO_CHAIN_ENV = Object.fromEntries(
  Object.entries(CHAIN_ENV_TO_CHAIN).map(([chainEnv, chain]) => [
    chain.id,
    chainEnv,
  ]),
) as Record<number, ChainEnv>;
