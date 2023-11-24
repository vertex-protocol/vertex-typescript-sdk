import { VertexContracts } from './vertexContracts';
import ArbitrumSepoliaCoreDeployment from './deployments/core/deployment.arbitrumSepolia.json';
import ArbitrumOneCoreDeployment from './deployments/core/deployment.arbitrumOne.json';
import LocalCoreDeployment from './deployments/core/deployment.localhost.json';

import ArbitrumSepoliaLbaDeployment from './deployments/vrtx/deployment.arbitrumSepolia.json';
import ArbitrumOneLbaDeployment from './deployments/vrtx/deployment.arbitrumOne.json';
import LocalLbaDeployment from './deployments/vrtx/deployment.localhost.json';

import { ChainEnv } from './types';

export type VertexDeploymentAddresses = {
  [K in keyof VertexContracts]: string;
};

/**
 * Known deployment addresses for the Vertex contracts
 */
export const VERTEX_DEPLOYMENTS: Record<ChainEnv, VertexDeploymentAddresses> = {
  testnet: {
    ...ArbitrumSepoliaCoreDeployment,
    ...ArbitrumSepoliaLbaDeployment,
  },
  mainnet: {
    ...ArbitrumOneLbaDeployment,
    ...ArbitrumOneCoreDeployment,
  },
  local: {
    ...LocalLbaDeployment,
    ...LocalCoreDeployment,
  },
};
