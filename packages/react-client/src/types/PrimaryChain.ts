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
} from 'wagmi/chains';

const PRIMARY_CHAINS = [
  localhost,
  hardhat,
  arbitrum,
  arbitrumSepolia,
  blastSepolia,
  blast,
  mantleSepoliaTestnet,
  mantle,
  seiTestnet,
] as const;

export type PrimaryChain = (typeof PRIMARY_CHAINS)[number];

export type PrimaryChainID = PrimaryChain['id'];
