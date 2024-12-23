import {
  ChainEnv,
  Endpoint__factory,
  FQuerier__factory,
  IAirdrop__factory,
  IArbAirdrop__factory,
  IClearinghouse__factory,
  IERC20__factory,
  ILBA__factory,
  IPerpEngine__factory,
  ISpotEngine__factory,
  IStaking__factory,
  IStakingV2__factory,
  IVesting__factory,
  VERTEX_DEPLOYMENTS,
  VertexContracts,
  VertexDeploymentAddresses,
  WithdrawPool__factory,
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
import { Provider, Signer } from 'ethers';
import { isSigner } from './utils';

/**
 * Context required to use the Vertex client.
 */
export interface VertexClientContext {
  // Must be a signer to use any executions
  signerOrProvider: Signer | Provider;
  // Used to sign engine transactions if provided, instead of signerOrProvider
  linkedSigner?: Signer;
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
export type CreateVertexClientContextSignerOpts = Pick<
  VertexClientContext,
  'signerOrProvider' | 'linkedSigner'
>;

export type CreateVertexClientContextOpts = VertexClientContextOpts | ChainEnv;

/**
 * Utility function to create client context from options
 *
 * @param opts
 * @param signerOpts
 */
export function createClientContext(
  opts: CreateVertexClientContextOpts,
  signerOpts: CreateVertexClientContextSignerOpts,
): VertexClientContext {
  const {
    contractAddresses,
    engineEndpoint,
    indexerEndpoint,
    triggerEndpoint,
  } = ((): VertexClientContextOpts => {
    if (opts === 'arbitrumTestnet') {
      return {
        contractAddresses: VERTEX_DEPLOYMENTS.arbitrumTestnet,
        engineEndpoint: ENGINE_CLIENT_ENDPOINTS.arbitrumTestnet,
        indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.arbitrumTestnet,
        triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.arbitrumTestnet,
      };
    }
    if (opts === 'arbitrum') {
      return {
        contractAddresses: VERTEX_DEPLOYMENTS.arbitrum,
        engineEndpoint: ENGINE_CLIENT_ENDPOINTS.arbitrum,
        indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.arbitrum,
        triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.arbitrum,
      };
    }
    if (opts === 'blastTestnet') {
      return {
        contractAddresses: VERTEX_DEPLOYMENTS.blastTestnet,
        engineEndpoint: ENGINE_CLIENT_ENDPOINTS.blastTestnet,
        indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.blastTestnet,
        triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.blastTestnet,
      };
    }
    if (opts === 'blast') {
      return {
        contractAddresses: VERTEX_DEPLOYMENTS.blast,
        engineEndpoint: ENGINE_CLIENT_ENDPOINTS.blast,
        indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.blast,
        triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.blast,
      };
    }
    if (opts === 'mantleTestnet') {
      return {
        contractAddresses: VERTEX_DEPLOYMENTS.mantleTestnet,
        engineEndpoint: ENGINE_CLIENT_ENDPOINTS.mantleTestnet,
        indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.mantleTestnet,
        triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.mantleTestnet,
      };
    }
    if (opts === 'mantle') {
      return {
        contractAddresses: VERTEX_DEPLOYMENTS.mantle,
        engineEndpoint: ENGINE_CLIENT_ENDPOINTS.mantle,
        indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.mantle,
        triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.mantle,
      };
    }
    if (opts === 'seiTestnet') {
      return {
        contractAddresses: VERTEX_DEPLOYMENTS.seiTestnet,
        engineEndpoint: ENGINE_CLIENT_ENDPOINTS.seiTestnet,
        indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.seiTestnet,
        triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.seiTestnet,
      };
    }
    if (opts === 'sei') {
      return {
        contractAddresses: VERTEX_DEPLOYMENTS.sei,
        engineEndpoint: ENGINE_CLIENT_ENDPOINTS.sei,
        indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.sei,
        triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.sei,
      };
    }
    if (opts === 'baseTestnet') {
      return {
        contractAddresses: VERTEX_DEPLOYMENTS.baseTestnet,
        engineEndpoint: ENGINE_CLIENT_ENDPOINTS.baseTestnet,
        indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.baseTestnet,
        triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.baseTestnet,
      };
    }
    if (opts === 'base') {
      return {
        contractAddresses: VERTEX_DEPLOYMENTS.base,
        engineEndpoint: ENGINE_CLIENT_ENDPOINTS.base,
        indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.base,
        triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.base,
      };
    }
    if (opts === 'sonicTestnet') {
      return {
        contractAddresses: VERTEX_DEPLOYMENTS.sonicTestnet,
        engineEndpoint: ENGINE_CLIENT_ENDPOINTS.sonicTestnet,
        indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.sonicTestnet,
        triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.sonicTestnet,
      };
    }
    if (opts === 'sonic') {
      return {
        contractAddresses: VERTEX_DEPLOYMENTS.sonic,
        engineEndpoint: ENGINE_CLIENT_ENDPOINTS.sonic,
        indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.sonic,
        triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.sonic,
      };
    }
    if (opts === 'beraTestnet') {
      return {
        contractAddresses: VERTEX_DEPLOYMENTS.beraTestnet,
        engineEndpoint: ENGINE_CLIENT_ENDPOINTS.beraTestnet,
        indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.beraTestnet,
        triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.beraTestnet,
      };
    }
    if (opts === 'local') {
      return {
        contractAddresses: VERTEX_DEPLOYMENTS.local,
        engineEndpoint: ENGINE_CLIENT_ENDPOINTS.local,
        indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.local,
        triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.local,
      };
    }
    return opts;
  })();
  const { signerOrProvider, linkedSigner } = signerOpts;

  const validSigner = isSigner(signerOrProvider) ? signerOrProvider : undefined;

  return {
    signerOrProvider: signerOrProvider,
    linkedSigner,
    contracts: {
      querier: FQuerier__factory.connect(
        contractAddresses.querier,
        signerOrProvider,
      ),
      clearinghouse: IClearinghouse__factory.connect(
        contractAddresses.clearinghouse,
        signerOrProvider,
      ),
      endpoint: Endpoint__factory.connect(
        contractAddresses.endpoint,
        signerOrProvider,
      ),
      spotEngine: ISpotEngine__factory.connect(
        contractAddresses.spotEngine,
        signerOrProvider,
      ),
      perpEngine: IPerpEngine__factory.connect(
        contractAddresses.perpEngine,
        signerOrProvider,
      ),
      foundationRewardsAirdrop: IArbAirdrop__factory.connect(
        contractAddresses.foundationRewardsAirdrop,
        signerOrProvider,
      ),
      withdrawPool: WithdrawPool__factory.connect(
        contractAddresses.withdrawPool,
        signerOrProvider,
      ),
      vrtxToken: IERC20__factory.connect(
        contractAddresses.vrtxToken,
        signerOrProvider,
      ),
      vrtxAirdrop: IAirdrop__factory.connect(
        contractAddresses.vrtxAirdrop,
        signerOrProvider,
      ),
      vrtxLba: ILBA__factory.connect(
        contractAddresses.vrtxLba,
        signerOrProvider,
      ),
      vrtxVesting: IVesting__factory.connect(
        contractAddresses.vrtxVesting,
        signerOrProvider,
      ),
      vrtxStaking: IStaking__factory.connect(
        contractAddresses.vrtxStaking,
        signerOrProvider,
      ),
      vrtxStakingV2: IStakingV2__factory.connect(
        contractAddresses.vrtxStakingV2,
        signerOrProvider,
      ),
    },
    contractAddresses,
    engineClient: new EngineClient({
      url: engineEndpoint,
      signer: validSigner,
      linkedSigner: signerOpts.linkedSigner,
    }),
    indexerClient: new IndexerClient({
      url: indexerEndpoint,
      signer: validSigner,
    }),
    triggerClient: new TriggerClient({
      url: triggerEndpoint,
      signer: validSigner,
      linkedSigner: signerOpts.linkedSigner,
    }),
  };
}
