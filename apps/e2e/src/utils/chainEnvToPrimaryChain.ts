import { ChainEnv } from '@vertex-protocol/contracts';
import { Chain } from 'viem';
import {
  abstract,
  abstractTestnet,
  arbitrum,
  arbitrumSepolia,
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
  sonicTestnet,
} from 'viem/chains';

// TODO: Consolidate w/ web
export const CHAIN_ENV_TO_PRIMARY_CHAIN = {
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
} as const satisfies Record<ChainEnv, Chain>;
