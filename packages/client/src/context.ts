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
  IVesting__factory,
  SenderReceiver__factory,
  VERTEX_DEPLOYMENTS,
  VertexContracts,
  VertexDeploymentAddresses,
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
 * @param optsOrChainEnv
 * @param signerOpts
 */
export async function createClientContext(
  optsOrChainEnv: CreateVertexClientContextOpts,
  signerOpts: CreateVertexClientContextSignerOpts,
): Promise<VertexClientContext> {
  const {
    contractAddresses,
    engineEndpoint,
    indexerEndpoint,
    triggerEndpoint,
  } = ((): VertexClientContextOpts => {
    if (typeof optsOrChainEnv === 'object') {
      // Custom config
      return optsOrChainEnv;
    }

    return {
      contractAddresses: VERTEX_DEPLOYMENTS[optsOrChainEnv],
      engineEndpoint: ENGINE_CLIENT_ENDPOINTS[optsOrChainEnv],
      indexerEndpoint: INDEXER_CLIENT_ENDPOINTS[optsOrChainEnv],
      triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS[optsOrChainEnv],
    };
  })();
  const { signerOrProvider, linkedSigner } = signerOpts;

  const validSigner = isSigner(signerOrProvider)
    ? (signerOrProvider as Signer)
    : undefined;

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
      arbAirdrop: IArbAirdrop__factory.connect(
        contractAddresses.arbAirdrop,
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
      senderReceiver: SenderReceiver__factory.connect(
        contractAddresses.senderReceiver,
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
    }),
    triggerClient: new TriggerClient({
      url: triggerEndpoint,
      signer: validSigner,
      linkedSigner: signerOpts.linkedSigner,
    }),
  };
}
