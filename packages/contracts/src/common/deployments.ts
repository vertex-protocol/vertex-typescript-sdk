import { VertexContracts } from './vertexContracts';
import ArbitrumGoerliDeployment from './deployments/deployment.arbitrumGoerli.json';
import DevDeployment from './deployments/deployment.dev.json';

export type VertexDeploymentAddresses = {
  [K in keyof VertexContracts]: string;
};

/**
 * Known deployment addresses for the Vertex contracts
 */
export const VERTEX_DEPLOYMENTS: Record<
  'dev' | 'testnet' | 'mainnet',
  VertexDeploymentAddresses
> = {
  dev: DevDeployment,
  testnet: ArbitrumGoerliDeployment,
  // Not deployed yet
  mainnet: ArbitrumGoerliDeployment,
};
