import { getValidatedAddress } from '@vertex-protocol/utils';
import { Address } from 'viem';
import ArbitrumOneCoreDeployment from './core/deployment.arbitrumOne.json';
import ArbitrumSepoliaCoreDeployment from './core/deployment.arbitrumSepolia.json';
import LocalCoreDeployment from './core/deployment.localhost.json';

import { ChainEnv } from '../types';
import { VertexContractName } from '../vertexAbis';

export type VertexDeploymentAddresses = {
  [name in VertexContractName]: Address;
};

/**
 * Known deployment addresses for the Vertex contracts
 */
export const VERTEX_DEPLOYMENTS: Record<ChainEnv, VertexDeploymentAddresses> = {
  arbitrumTestnet: validateDeployment({
    ...ArbitrumSepoliaCoreDeployment,
  }),
  arbitrum: validateDeployment({
    ...ArbitrumOneCoreDeployment,
  }),
  local: validateDeployment({
    ...LocalCoreDeployment,
  }),
};

function validateDeployment(
  deployment: Record<VertexContractName, string>,
): Record<VertexContractName, Address> {
  return {
    clearinghouse: getValidatedAddress(deployment.clearinghouse),
    endpoint: getValidatedAddress(deployment.endpoint),
    perpEngine: getValidatedAddress(deployment.perpEngine),
    querier: getValidatedAddress(deployment.querier),
    spotEngine: getValidatedAddress(deployment.spotEngine),
    withdrawPool: getValidatedAddress(deployment.withdrawPool),
  };
}
