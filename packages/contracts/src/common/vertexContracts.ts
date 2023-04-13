import {
  Endpoint,
  FQuerier,
  IClearinghouse,
  IPerpEngine,
  ISpotEngine,
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
}

// Utility types to bundle parameters with contracts
export type WithContracts<T> = T & VertexContracts;
export type WithContract<TContractName extends keyof VertexContracts, T> = T &
  Pick<VertexContracts, TContractName>;
