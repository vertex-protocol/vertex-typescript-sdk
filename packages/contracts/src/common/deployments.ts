import ArbitrumOneCoreDeployment from './deployments/core/deployment.arbitrumOne.json';
import ArbitrumSepoliaCoreDeployment from './deployments/core/deployment.arbitrumSepolia.json';
import BlastSepoliaCoreDeployment from './deployments/core/deployment.blastSepolia.json';
import LocalCoreDeployment from './deployments/core/deployment.localhost.json';
import ArbitrumOneLbaDeployment from './deployments/vrtx/deployment.arbitrumOne.json';

import ArbitrumSepoliaLbaDeployment from './deployments/vrtx/deployment.arbitrumSepolia.json';
import BlastSepoliaLbaDeployment from './deployments/vrtx/deployment.blastSepolia.json';
import LocalLbaDeployment from './deployments/vrtx/deployment.localhost.json';

import { ChainEnv } from './types';
import { VertexContracts } from './vertexContracts';

export type VertexDeploymentAddresses = {
  [K in keyof VertexContracts]: string;
};

/**
 * Known deployment addresses for the Vertex contracts
 */
export const VERTEX_DEPLOYMENTS: Record<ChainEnv, VertexDeploymentAddresses> = {
  blastTestnet: {
    ...BlastSepoliaLbaDeployment,
    ...BlastSepoliaCoreDeployment,
  },
  testnet: {
    ...ArbitrumSepoliaCoreDeployment,
    ...ArbitrumSepoliaLbaDeployment,
  },
  mainnet: {
    ...ArbitrumOneLbaDeployment,
    ...ArbitrumOneCoreDeployment,
  },
  blastMainnet: {
    // TODO
    ...ArbitrumOneLbaDeployment,
    ...ArbitrumOneCoreDeployment,
  },
  local: {
    ...LocalLbaDeployment,
    ...LocalCoreDeployment,
  },
};
