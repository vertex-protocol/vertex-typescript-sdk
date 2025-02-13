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
  const { signerOrProvider, linkedSigner } = signerOpts;

  const validSigner = isSigner(signerOrProvider) ? signerOrProvider : undefined;

  return {
    signerOrProvider,
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
