import { WriteableContractInstance } from './types';
import { VertexAbis, VertexContractName } from './vertexAbis';

/**
 * Encapsulates the set of Vertex contracts required for querying and executing, assumes that a wallet client is connected
 */
export type VertexContracts = {
  [name in VertexContractName]: WriteableContractInstance<VertexAbis[name]>;
};

// Utility types to bundle parameters with contracts
export type WithContracts<T> = T & VertexContracts;
export type WithContract<TContractName extends keyof VertexContracts, T> = T &
  Pick<VertexContracts, TContractName>;
