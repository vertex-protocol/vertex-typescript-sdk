import {
  ChainEnv,
  VERTEX_ABIS,
  VERTEX_DEPLOYMENTS,
  VertexContractName,
  VertexContracts,
  VertexDeploymentAddresses,
  WalletClientWithAccount,
} from '@vertex-protocol/contracts';
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
import { getContract, PublicClient } from 'viem';

/**
 * Context required to use the Vertex client.
 */
export interface VertexClientContext {
  publicClient: PublicClient;
  walletClient?: WalletClientWithAccount;
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
  'walletClient' | 'linkedSignerWalletClient' | 'publicClient'
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
  const { publicClient, walletClient, linkedSignerWalletClient } = accountOpts;

  return {
    walletClient,
    linkedSignerWalletClient,
    publicClient,
    contracts: {
      querier: getVertexContract({
        contractAddresses,
        contractName: 'querier',
        walletClient,
        publicClient,
      }),
      clearinghouse: getVertexContract({
        contractAddresses,
        contractName: 'clearinghouse',
        walletClient,
        publicClient,
      }),
      endpoint: getVertexContract({
        contractAddresses,
        contractName: 'endpoint',
        walletClient,
        publicClient,
      }),
      spotEngine: getVertexContract({
        contractAddresses,
        contractName: 'spotEngine',
        walletClient,
        publicClient,
      }),
      perpEngine: getVertexContract({
        contractAddresses,
        contractName: 'perpEngine',
        walletClient,
        publicClient,
      }),
      withdrawPool: getVertexContract({
        contractAddresses,
        contractName: 'withdrawPool',
        walletClient,
        publicClient,
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

interface GetVertexContractParams<T extends VertexContractName> {
  contractAddresses: VertexDeploymentAddresses;
  contractName: T;
  walletClient?: WalletClientWithAccount;
  publicClient: PublicClient;
}

function getVertexContract<T extends VertexContractName>({
  contractAddresses,
  contractName,
  walletClient,
  publicClient,
}: GetVertexContractParams<T>): VertexContracts[T] {
  return getContract({
    address: contractAddresses[contractName],
    abi: VERTEX_ABIS[contractName],
    client: walletClient ?? publicClient,
  }) as VertexContracts[T];
}
