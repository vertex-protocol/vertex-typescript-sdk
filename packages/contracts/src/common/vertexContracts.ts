import {
  IClearinghouse,
  IPerpEngine,
  ISpotEngine,
  IVertexQuerier,
} from '../typechain-types';

export interface VertexContracts {
  querier: IVertexQuerier;
  clearinghouse: IClearinghouse;
  spotEngine: ISpotEngine;
  perpEngine: IPerpEngine;
}

export type WithContracts<T> = T & VertexContracts;
