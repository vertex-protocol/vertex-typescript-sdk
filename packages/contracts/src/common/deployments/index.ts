import { getValidatedAddress } from '@vertex-protocol/utils';
import { Address } from 'viem';
import AbstractMainnetCoreDeployment from './core/deployment.abstractMainnet.json';
import AbstractTestnetCoreDeployment from './core/deployment.abstractTestnet.json';
import ArbitrumOneCoreDeployment from './core/deployment.arbitrumOne.json';
import ArbitrumSepoliaCoreDeployment from './core/deployment.arbitrumSepolia.json';
import AvaxMainnetCoreDeployment from './core/deployment.avaxMainnet.json';
import AvaxTestnetCoreDeployment from './core/deployment.avaxTestnet.json';
import BaseMainnetCoreDeployment from './core/deployment.baseMainnet.json';
import BaseTestnetCoreDeployment from './core/deployment.baseTestnet.json';
import BeraMainnetCoreDeployment from './core/deployment.beraMainnet.json';
import BeraTestnetCoreDeployment from './core/deployment.beraTestnet.json';
import BlastMainnetCoreDeployment from './core/deployment.blastMainnet.json';
import BlastSepoliaCoreDeployment from './core/deployment.blastSepolia.json';
import LocalCoreDeployment from './core/deployment.localhost.json';
import MantleMainnetCoreDeployment from './core/deployment.mantleMainnet.json';
import MantleSepoliaCoreDeployment from './core/deployment.mantleSepolia.json';
import SeiMainnetCoreDeployment from './core/deployment.seiMainnet.json';
import SeiTestnetCoreDeployment from './core/deployment.seiTestnet.json';
import SonicMainnetCoreDeployment from './core/deployment.sonicMainnet.json';
import SonicTestnetCoreDeployment from './core/deployment.sonicTestnet.json';
import XrplTestnetCoreDeployment from './core/deployment.xrplTestnet.json';

import AbstractMainnetLbaDeployment from './vrtx/deployment.abstractMainnet.json';
import AbstractTestnetLbaDeployment from './vrtx/deployment.abstractTestnet.json';
import ArbitrumOneLbaDeployment from './vrtx/deployment.arbitrumOne.json';
import ArbitrumSepoliaLbaDeployment from './vrtx/deployment.arbitrumSepolia.json';
import AvaxMainnetLbaDeployment from './vrtx/deployment.avaxMainnet.json';
import AvaxTestnetLbaDeployment from './vrtx/deployment.avaxTestnet.json';
import BaseMainnetLbaDeployment from './vrtx/deployment.baseMainnet.json';
import BaseTestnetLbaDeployment from './vrtx/deployment.baseTestnet.json';
import BeraMainnetLbaDeployment from './vrtx/deployment.beraMainnet.json';
import BeraTestnetLbaDeployment from './vrtx/deployment.beraTestnet.json';
import BlastMainnetLbaDeployment from './vrtx/deployment.blastMainnet.json';
import BlastSepoliaLbaDeployment from './vrtx/deployment.blastSepolia.json';
import LocalLbaDeployment from './vrtx/deployment.localhost.json';
import MantleMainnetLbaDeployment from './vrtx/deployment.mantleMainnet.json';
import MantleSepoliaLbaDeployment from './vrtx/deployment.mantleSepolia.json';
import SeiMainnetLbaDeployment from './vrtx/deployment.seiMainnet.json';
import SeiTestnetLbaDeployment from './vrtx/deployment.seiTestnet.json';
import SonicMainnetLbaDeployment from './vrtx/deployment.sonicMainnet.json';
import SonicTestnetLbaDeployment from './vrtx/deployment.sonicTestnet.json';
import XrplTestnetLbaDeployment from './vrtx/deployment.xrplTestnet.json';

import { ChainEnv } from '../types';
import { VertexContractName } from '../vertexAbis';

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
  avax: validateDeployment({
    ...AvaxMainnetLbaDeployment,
    ...AvaxMainnetCoreDeployment,
  }),
  xrplTestnet: validateDeployment({
    ...XrplTestnetLbaDeployment,
    ...XrplTestnetCoreDeployment,
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
