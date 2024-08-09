import ArbitrumOneCoreDeployment from './deployments/core/deployment.arbitrumOne.json';
import ArbitrumSepoliaCoreDeployment from './deployments/core/deployment.arbitrumSepolia.json';
import BlastMainnetCoreDeployment from './deployments/core/deployment.blastMainnet.json';
import BlastSepoliaCoreDeployment from './deployments/core/deployment.blastSepolia.json';
import LocalCoreDeployment from './deployments/core/deployment.localhost.json';
import MantleSepoliaCoreDeployment from './deployments/core/deployment.mantleSepolia.json';
import MantleMainnetCoreDeployment from './deployments/core/deployment.mantleMainnet.json';
import SeiTestnetCoreDeployment from './deployments/core/deployment.seiTestnet.json';
import SeiMainnetCoreDeployment from './deployments/core/deployment.seiMainnet.json';

import ArbitrumOneLbaDeployment from './deployments/vrtx/deployment.arbitrumOne.json';
import ArbitrumSepoliaLbaDeployment from './deployments/vrtx/deployment.arbitrumSepolia.json';
import BlastMainnetLbaDeployment from './deployments/vrtx/deployment.blastMainnet.json';
import BlastSepoliaLbaDeployment from './deployments/vrtx/deployment.blastSepolia.json';
import LocalLbaDeployment from './deployments/vrtx/deployment.localhost.json';
import MantleSepoliaLbaDeployment from './deployments/vrtx/deployment.mantleSepolia.json';
import MantleMainnetLbaDeployment from './deployments/vrtx/deployment.mantleMainnet.json';
import SeiTestnetLbaDeployment from './deployments/vrtx/deployment.seiTestnet.json';
import SeiMainnetLbaDeployment from './deployments/vrtx/deployment.seiMainnet.json';

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
  arbitrumTestnet: {
    ...ArbitrumSepoliaCoreDeployment,
    ...ArbitrumSepoliaLbaDeployment,
  },
  arbitrum: {
    ...ArbitrumOneLbaDeployment,
    ...ArbitrumOneCoreDeployment,
  },
  blast: {
    ...BlastMainnetLbaDeployment,
    ...BlastMainnetCoreDeployment,
  },
  mantleTestnet: {
    ...MantleSepoliaLbaDeployment,
    ...MantleSepoliaCoreDeployment,
  },
  mantle: {
    ...MantleMainnetLbaDeployment,
    ...MantleMainnetCoreDeployment,
  },
  seiTestnet: {
    ...SeiTestnetLbaDeployment,
    ...SeiTestnetCoreDeployment,
  },
  sei: {
    ...SeiMainnetLbaDeployment,
    ...SeiMainnetCoreDeployment,
  },
  local: {
    ...LocalLbaDeployment,
    ...LocalCoreDeployment,
  },
};
