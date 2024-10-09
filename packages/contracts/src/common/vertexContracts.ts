import {
  Endpoint,
  FQuerier,
  IAirdrop,
  IArbAirdrop,
  IClearinghouse,
  IERC20,
  ILBA,
  IPerpEngine,
  ISpotEngine,
  IStaking,
  IStakingV2,
  IVesting,
  WithdrawPool,
} from '../typechain-types';

/**
 * Encapsulates the set of Vertex contracts required for querying and executing
 */
export interface VertexContracts {
  querier: FQuerier;
  endpoint: Endpoint;
  clearinghouse: IClearinghouse;
  spotEngine: ISpotEngine;
  perpEngine: IPerpEngine;
  foundationRewardsAirdrop: IArbAirdrop;
  withdrawPool: WithdrawPool;
  vrtxToken: IERC20;
  vrtxAirdrop: IAirdrop;
  vrtxLba: ILBA;
  vrtxVesting: IVesting;
  vrtxStaking: IStaking;
  vrtxStakingV2: IStakingV2;
}

// Utility types to bundle parameters with contracts
export type WithContracts<T> = T & VertexContracts;
export type WithContract<TContractName extends keyof VertexContracts, T> = T &
  Pick<VertexContracts, TContractName>;
