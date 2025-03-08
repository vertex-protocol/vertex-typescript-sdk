import { getValidatedAddress } from '@vertex-protocol/utils';
import { Address } from 'viem';
import AbstractMainnetCoreDeployment from './deployments/core/deployment.abstractMainnet.json';
import AbstractTestnetCoreDeployment from './deployments/core/deployment.abstractTestnet.json';
import ArbitrumOneCoreDeployment from './deployments/core/deployment.arbitrumOne.json';
import ArbitrumSepoliaCoreDeployment from './deployments/core/deployment.arbitrumSepolia.json';
import AvaxTestnetCoreDeployment from './deployments/core/deployment.avaxTestnet.json';
import BaseMainnetCoreDeployment from './deployments/core/deployment.baseMainnet.json';
import BaseTestnetCoreDeployment from './deployments/core/deployment.baseTestnet.json';
import BeraMainnetCoreDeployment from './deployments/core/deployment.beraMainnet.json';
import BeraTestnetCoreDeployment from './deployments/core/deployment.beraTestnet.json';
import BlastMainnetCoreDeployment from './deployments/core/deployment.blastMainnet.json';
import BlastSepoliaCoreDeployment from './deployments/core/deployment.blastSepolia.json';
import LocalCoreDeployment from './deployments/core/deployment.localhost.json';
import MantleMainnetCoreDeployment from './deployments/core/deployment.mantleMainnet.json';
import MantleSepoliaCoreDeployment from './deployments/core/deployment.mantleSepolia.json';
import SeiMainnetCoreDeployment from './deployments/core/deployment.seiMainnet.json';
import SeiTestnetCoreDeployment from './deployments/core/deployment.seiTestnet.json';
import SonicMainnetCoreDeployment from './deployments/core/deployment.sonicMainnet.json';
import SonicTestnetCoreDeployment from './deployments/core/deployment.sonicTestnet.json';
import AbstractMainnetLbaDeployment from './deployments/vrtx/deployment.abstractMainnet.json';
import AbstractTestnetLbaDeployment from './deployments/vrtx/deployment.abstractTestnet.json';

import ArbitrumOneLbaDeployment from './deployments/vrtx/deployment.arbitrumOne.json';
import ArbitrumSepoliaLbaDeployment from './deployments/vrtx/deployment.arbitrumSepolia.json';
import AvaxTestnetLbaDeployment from './deployments/vrtx/deployment.avaxTestnet.json';
import BaseMainnetLbaDeployment from './deployments/vrtx/deployment.baseMainnet.json';
import BaseTestnetLbaDeployment from './deployments/vrtx/deployment.baseTestnet.json';
import BeraMainnetLbaDeployment from './deployments/vrtx/deployment.beraMainnet.json';
import BeraTestnetLbaDeployment from './deployments/vrtx/deployment.beraTestnet.json';
import BlastMainnetLbaDeployment from './deployments/vrtx/deployment.blastMainnet.json';
import BlastSepoliaLbaDeployment from './deployments/vrtx/deployment.blastSepolia.json';
import LocalLbaDeployment from './deployments/vrtx/deployment.localhost.json';
import MantleMainnetLbaDeployment from './deployments/vrtx/deployment.mantleMainnet.json';
import MantleSepoliaLbaDeployment from './deployments/vrtx/deployment.mantleSepolia.json';
import SeiMainnetLbaDeployment from './deployments/vrtx/deployment.seiMainnet.json';
import SeiTestnetLbaDeployment from './deployments/vrtx/deployment.seiTestnet.json';
import SonicMainnetLbaDeployment from './deployments/vrtx/deployment.sonicMainnet.json';
import SonicTestnetLbaDeployment from './deployments/vrtx/deployment.sonicTestnet.json';

import { ChainEnv } from './types';
import { VertexContractName } from './vertexAbis';

export type VertexDeploymentAddresses = {
  [name in VertexContractName]: Address;
};

/**
 * Known deployment addresses for the Vertex contracts
 */
export const VERTEX_DEPLOYMENTS: Record<ChainEnv, VertexDeploymentAddresses> = {
  blastTestnet: validateDeployment({
    ...BlastSepoliaLbaDeployment,
    ...BlastSepoliaCoreDeployment,
  }),
  arbitrumTestnet: validateDeployment({
    ...ArbitrumSepoliaCoreDeployment,
    ...ArbitrumSepoliaLbaDeployment,
  }),
  arbitrum: validateDeployment({
    ...ArbitrumOneLbaDeployment,
    ...ArbitrumOneCoreDeployment,
  }),
  blast: validateDeployment({
    ...BlastMainnetLbaDeployment,
    ...BlastMainnetCoreDeployment,
  }),
  mantleTestnet: validateDeployment({
    ...MantleSepoliaLbaDeployment,
    ...MantleSepoliaCoreDeployment,
  }),
  mantle: validateDeployment({
    ...MantleMainnetLbaDeployment,
    ...MantleMainnetCoreDeployment,
  }),
  seiTestnet: validateDeployment({
    ...SeiTestnetLbaDeployment,
    ...SeiTestnetCoreDeployment,
  }),
  sei: validateDeployment({
    ...SeiMainnetLbaDeployment,
    ...SeiMainnetCoreDeployment,
  }),
  baseTestnet: validateDeployment({
    ...BaseTestnetLbaDeployment,
    ...BaseTestnetCoreDeployment,
  }),
  base: validateDeployment({
    ...BaseMainnetLbaDeployment,
    ...BaseMainnetCoreDeployment,
  }),
  sonicTestnet: validateDeployment({
    ...SonicTestnetLbaDeployment,
    ...SonicTestnetCoreDeployment,
  }),
  sonic: validateDeployment({
    ...SonicMainnetLbaDeployment,
    ...SonicMainnetCoreDeployment,
  }),
  abstractTestnet: validateDeployment({
    ...AbstractTestnetLbaDeployment,
    ...AbstractTestnetCoreDeployment,
  }),
  abstract: validateDeployment({
    ...AbstractMainnetLbaDeployment,
    ...AbstractMainnetCoreDeployment,
  }),
  beraTestnet: validateDeployment({
    ...BeraTestnetLbaDeployment,
    ...BeraTestnetCoreDeployment,
  }),
  bera: validateDeployment({
    ...BeraMainnetLbaDeployment,
    ...BeraMainnetCoreDeployment,
  }),
  avaxTestnet: validateDeployment({
    ...AvaxTestnetLbaDeployment,
    ...AvaxTestnetCoreDeployment,
  }),
  local: validateDeployment({
    ...LocalLbaDeployment,
    ...LocalCoreDeployment,
  }),
};

function validateDeployment(
  deployment: Record<VertexContractName, string>,
): Record<VertexContractName, Address> {
  return {
    clearinghouse: getValidatedAddress(deployment.clearinghouse),
    endpoint: getValidatedAddress(deployment.endpoint),
    foundationRewardsAirdrop: getValidatedAddress(
      deployment.foundationRewardsAirdrop,
    ),
    perpEngine: getValidatedAddress(deployment.perpEngine),
    querier: getValidatedAddress(deployment.querier),
    spotEngine: getValidatedAddress(deployment.spotEngine),
    vrtxAirdrop: getValidatedAddress(deployment.vrtxAirdrop),
    vrtxLba: getValidatedAddress(deployment.vrtxLba),
    vrtxStaking: getValidatedAddress(deployment.vrtxStaking),
    vrtxStakingV2: getValidatedAddress(deployment.vrtxStakingV2),
    vrtxToken: getValidatedAddress(deployment.vrtxToken),
    vrtxVesting: getValidatedAddress(deployment.vrtxVesting),
    withdrawPool: getValidatedAddress(deployment.withdrawPool),
  };
}
