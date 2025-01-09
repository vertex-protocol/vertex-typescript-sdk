export const ALL_CHAIN_ENVS = [
  'local',
  'arbitrumTestnet',
  'arbitrum',
  'blastTestnet',
  'blast',
  'mantleTestnet',
  'mantle',
  'seiTestnet',
  'sei',
  'baseTestnet',
  'base',
  'sonicTestnet',
  'sonic',
  'beraTestnet',
  'abstractTestnet',
] as const;

export type ChainEnv = (typeof ALL_CHAIN_ENVS)[number];
