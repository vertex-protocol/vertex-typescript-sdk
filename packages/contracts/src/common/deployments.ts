import { VertexContracts } from './vertexContracts';
import ArbitrumGoerliDeployment from './deployments/deployment.arbitrumGoerli.json';
import ArbitrumOneDeployment from './deployments/deployment.arbitrumOne.json';
import LocalDeployment from './deployments/deployment.localhost.json';
import { ChainEnv } from './types';

export type VertexDeploymentAddresses = {
  [K in keyof VertexContracts]: string;
};

/**
 * Known deployment addresses for the Vertex contracts
 */
export const VERTEX_DEPLOYMENTS: Record<ChainEnv, VertexDeploymentAddresses> = {
  testnet: ArbitrumGoerliDeployment,
  mainnet: ArbitrumOneDeployment,
  local: LocalDeployment,
};
