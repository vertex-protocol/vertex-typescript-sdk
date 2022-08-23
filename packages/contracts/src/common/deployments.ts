import { VertexContracts } from './vertexContracts';
import ArbitrumRinkebyDeployment from './deployments/deployment.arbitrumRinkeby.json';

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
  testnet: ArbitrumRinkebyDeployment,
  // Not deployed yet
  mainnet: ArbitrumRinkebyDeployment,
};
