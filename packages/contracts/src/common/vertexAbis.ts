import {
  AIRDROP_ABI,
  ARB_AIRDROP_ABI,
  CLEARINGHOUSE_ABI,
  ENDPOINT_ABI,
  ERC20_ABI,
  LBA_ABI,
  PERP_ENGINE_ABI,
  QUERIER_ABI,
  SPOT_ENGINE_ABI,
  STAKING_V1_ABI,
  STAKING_V2_ABI,
  VESTING_ABI,
  WITHDRAW_POOL_ABI,
} from './abis';

export const VERTEX_ABIS = {
  querier: QUERIER_ABI,
  endpoint: ENDPOINT_ABI,
  clearinghouse: CLEARINGHOUSE_ABI,
  spotEngine: SPOT_ENGINE_ABI,
  perpEngine: PERP_ENGINE_ABI,
  foundationRewardsAirdrop: ARB_AIRDROP_ABI,
  withdrawPool: WITHDRAW_POOL_ABI,
  vrtxToken: ERC20_ABI,
  vrtxAirdrop: AIRDROP_ABI,
  vrtxLba: LBA_ABI,
  vrtxVesting: VESTING_ABI,
  vrtxStaking: STAKING_V1_ABI,
  vrtxStakingV2: STAKING_V2_ABI,
} as const;

export type VertexAbis = typeof VERTEX_ABIS;

export type VertexContractName = keyof VertexAbis;
