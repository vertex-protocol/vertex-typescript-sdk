import {
  Endpoint,
  FQuerier,
  IAirdrop,
  IClearinghouse,
  IERC20,
  ILBA,
  IPerpEngine,
  ISpotEngine,
  IVesting,
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
  vrtxToken: IERC20;
  vrtxAirdrop: IAirdrop;
  vrtxLba: ILBA;
  vrtxVesting: IVesting;
}

// Utility types to bundle parameters with contracts
export type WithContracts<T> = T & VertexContracts;
export type WithContract<TContractName extends keyof VertexContracts, T> = T &
  Pick<VertexContracts, TContractName>;
