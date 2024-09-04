import {
  arbitrum,
  arbitrumSepolia,
  blast,
  blastSepolia,
  hardhat,
  localhost,
  mantle,
  mantleSepoliaTestnet,
  seiTestnet,
  sei,
  baseSepolia,
  base,
} from 'wagmi/chains';

export const PRIMARY_CHAINS = [
  localhost,
  hardhat,
  arbitrum,
  arbitrumSepolia,
  blastSepolia,
  blast,
  mantleSepoliaTestnet,
  mantle,
  seiTestnet,
  sei,
  baseSepolia,
  base,
] as const;

export const PRIMARY_CHAIN_IDS = PRIMARY_CHAINS.map((chain) => chain.id);

export type PrimaryChain = (typeof PRIMARY_CHAINS)[number];

export type PrimaryChainID = PrimaryChain['id'];
