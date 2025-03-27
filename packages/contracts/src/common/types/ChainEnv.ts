export const LOCAL_CHAIN_ENVS = ['local'] as const satisfies string[];

export const TESTNET_CHAIN_ENVS = [
  'arbitrumTestnet',
  'blastTestnet',
  'mantleTestnet',
  'seiTestnet',
  'baseTestnet',
  'sonicTestnet',
  'beraTestnet',
  'abstractTestnet',
  'avaxTestnet',
] as const satisfies string[];

export const MAINNET_CHAIN_ENVS = [
  'arbitrum',
  'blast',
  'mantle',
  'sei',
  'base',
  'sonic',
  'abstract',
  'bera',
  'avax',
] as const satisfies string[];

export const ALL_CHAIN_ENVS = [
  ...LOCAL_CHAIN_ENVS,
  ...TESTNET_CHAIN_ENVS,
  ...MAINNET_CHAIN_ENVS,
] as const satisfies string[];

export type ChainEnv = (typeof ALL_CHAIN_ENVS)[number];
