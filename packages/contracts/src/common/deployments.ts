import { VertexContracts } from './vertexContracts';
import ArbitrumGoerliDeployment from './deployments/deployment.arbitrumGoerli.json';

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
  // Not deployed yet
  mainnet: ArbitrumGoerliDeployment,
};
