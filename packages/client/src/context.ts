import {
  ChainEnv,
  VERTEX_DEPLOYMENTS,
  VertexContractName,
  VertexContracts,
  VertexDeploymentAddresses,
  WalletClientWithAccount,
} from '@vertex-protocol/contracts';
import { VERTEX_ABIS } from '@vertex-protocol/contracts/dist/common/vertexAbis';
import {
  ENGINE_CLIENT_ENDPOINTS,
  EngineClient,
} from '@vertex-protocol/engine-client';
import {
  INDEXER_CLIENT_ENDPOINTS,
  IndexerClient,
} from '@vertex-protocol/indexer-client';
import {
  TRIGGER_CLIENT_ENDPOINTS,
  TriggerClient,
} from '@vertex-protocol/trigger-client';
import { Address, getContract } from 'viem';

/**
 * Context required to use the Vertex client.
 */
export interface VertexClientContext {
  walletClient: WalletClientWithAccount;
  // If provided, this is used to sign engine transactions instead of the account associated with walletClient
  linkedSignerWalletClient?: WalletClientWithAccount;
  contracts: VertexContracts;
  contractAddresses: VertexDeploymentAddresses;
  engineClient: EngineClient;
  indexerClient: IndexerClient;
  triggerClient: TriggerClient;
}

/**
 * Args for creating a context
 */
interface VertexClientContextOpts {
  contractAddresses: VertexDeploymentAddresses;
  engineEndpoint: string;
  indexerEndpoint: string;
  triggerEndpoint: string;
}

/**
 * Args for signing configuration for creating a context
 */
export type CreateVertexClientContextAccountOpts = Pick<
  VertexClientContext,
  'walletClient' | 'linkedSignerWalletClient'
>;

export type CreateVertexClientContextOpts = VertexClientContextOpts | ChainEnv;

/**
 * Utility function to create client context from options
 *
 * @param opts
 * @param accountOpts
 */
export function createClientContext(
  opts: CreateVertexClientContextOpts,
  accountOpts: CreateVertexClientContextAccountOpts,
): VertexClientContext {
  const {
    contractAddresses,
    engineEndpoint,
    indexerEndpoint,
    triggerEndpoint,
  } = ((): VertexClientContextOpts => {
    // Custom options
    if (typeof opts === 'object') {
      return opts;
    }

    const chainEnv = opts;
    return {
      contractAddresses: VERTEX_DEPLOYMENTS[chainEnv],
      engineEndpoint: ENGINE_CLIENT_ENDPOINTS[chainEnv],
      indexerEndpoint: INDEXER_CLIENT_ENDPOINTS[chainEnv],
      triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS[chainEnv],
    };
  })();
  const { walletClient, linkedSignerWalletClient } = accountOpts;

  return {
    walletClient,
    linkedSignerWalletClient,
    contracts: {
      querier: getVertexContract({
        contractAddresses,
        contractName: 'querier',
        walletClient,
      }),
      clearinghouse: getVertexContract({
        contractAddresses,
        contractName: 'clearinghouse',
        walletClient,
      }),
      endpoint: getVertexContract({
        contractAddresses,
        contractName: 'endpoint',
        walletClient,
      }),
      spotEngine: getVertexContract({
        contractAddresses,
        contractName: 'spotEngine',
        walletClient,
      }),
      perpEngine: getVertexContract({
        contractAddresses,
        contractName: 'perpEngine',
        walletClient,
      }),
      foundationRewardsAirdrop: getVertexContract({
        contractAddresses,
        contractName: 'foundationRewardsAirdrop',
        walletClient,
      }),
      withdrawPool: getVertexContract({
        contractAddresses,
        contractName: 'withdrawPool',
        walletClient,
      }),
      vrtxToken: getVertexContract({
        contractAddresses,
        contractName: 'vrtxToken',
        walletClient,
      }),
      vrtxAirdrop: getVertexContract({
        contractAddresses,
        contractName: 'vrtxAirdrop',
        walletClient,
      }),
      vrtxLba: getVertexContract({
        contractAddresses,
        contractName: 'vrtxLba',
        walletClient,
      }),
      vrtxVesting: getVertexContract({
        contractAddresses,
        contractName: 'vrtxVesting',
        walletClient,
      }),
      vrtxStaking: getVertexContract({
        contractAddresses,
        contractName: 'vrtxStaking',
        walletClient,
      }),
      vrtxStakingV2: getVertexContract({
        contractAddresses,
        contractName: 'vrtxStakingV2',
        walletClient,
      }),
    },
    contractAddresses,
    engineClient: new EngineClient({
      url: engineEndpoint,
      walletClient,
      linkedSignerWalletClient,
    }),
    indexerClient: new IndexerClient({
      url: indexerEndpoint,
      walletClient,
    }),
    triggerClient: new TriggerClient({
      url: triggerEndpoint,
      walletClient,
      linkedSignerWalletClient,
    }),
  };
}

function getVertexContract<T extends VertexContractName>({
  contractAddresses,
  contractName,
  walletClient,
}: {
  contractAddresses: VertexDeploymentAddresses;
  contractName: T;
  walletClient: WalletClientWithAccount;
}): VertexContracts[T] {
  return getContract({
    address: contractAddresses[contractName] as Address,
    abi: VERTEX_ABIS[contractName],
    client: walletClient,
  }) as VertexContracts[T];
}
