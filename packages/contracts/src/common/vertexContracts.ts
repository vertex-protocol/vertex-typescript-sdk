import {
  IClearinghouse,
  IPerpEngine,
  ISequencer,
  ISpotEngine,
  IVertexQuerier,
} from '../typechain-types';

/**
 * Encapsulates the set of Vertex contracts required for querying and executing
 */
export interface VertexContracts {
  querier: IVertexQuerier;
  sequencer: ISequencer;
  clearinghouse: IClearinghouse;
  spotEngine: ISpotEngine;
  perpEngine: IPerpEngine;
}

// Utility type to bundle parameters with contracts
export type WithContracts<T> = T & VertexContracts;
