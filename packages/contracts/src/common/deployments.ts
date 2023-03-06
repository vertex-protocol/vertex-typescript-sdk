import { VertexContracts } from './vertexContracts';
import ArbitrumGoerliDeployment from './deployments/deployment.arbitrumGoerli.json';
import ArbitrumOneDeployment from './deployments/deployment.arbitrumOne.json';

export type VertexDeploymentAddresses = {
  [K in keyof VertexContracts]: string;
};

/**
 * Known deployment addresses for the Vertex contracts
 */
export const VERTEX_DEPLOYMENTS: Record<
  'testnet' | 'mainnet',
  VertexDeploymentAddresses
> = {
  testnet: ArbitrumGoerliDeployment,
  mainnet: ArbitrumOneDeployment,
};
