import {
  CLEARINGHOUSE_ABI,
  ENDPOINT_ABI,
  PERP_ENGINE_ABI,
  QUERIER_ABI,
  SPOT_ENGINE_ABI,
  WITHDRAW_POOL_ABI,
} from './abis';

export const VERTEX_ABIS = {
  querier: QUERIER_ABI,
  endpoint: ENDPOINT_ABI,
  clearinghouse: CLEARINGHOUSE_ABI,
  spotEngine: SPOT_ENGINE_ABI,
  perpEngine: PERP_ENGINE_ABI,
  withdrawPool: WITHDRAW_POOL_ABI,
} as const;

export type VertexAbis = typeof VERTEX_ABIS;

export type VertexContractName = keyof VertexAbis;
