import {
  ChainEnv,
  Endpoint__factory,
  FQuerier__factory,
  IClearinghouse__factory,
  IPerpEngine__factory,
  ISpotEngine__factory,
  ProductEngineType,
  ValidVertexSigner,
  VERTEX_DEPLOYMENTS,
  VertexContracts,
} from '@vertex-protocol/contracts';
import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
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

/**
 * Context required to use the Vertex client.
 */
export interface VertexClientContext {
  // Must be a signer to use any executions
  signerOrProvider: ValidVertexSigner | Provider;
  // Used to sign engine transactions if provided, instead of signerOrProvider
  linkedSigner?: ValidVertexSigner;
  contracts: VertexContracts;
  engineClient: EngineClient;
  indexerClient: IndexerClient;
  triggerClient: TriggerClient;
}

/**
 * Args for creating a context
 */
interface VertexClientContextOpts {
  // Contract addresses
  contracts: {
    // Only the querier is required, but you can specify all the contracts to minimize RPC calls
    querierAddress: string;
    spotEngineAddress?: string;
    perpEngineAddress?: string;
    clearinghouseAddress?: string;
    endpointAddress?: string;
  };
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
export async function createClientContext(
  opts: CreateVertexClientContextOpts,
  signerOpts: CreateVertexClientContextSignerOpts,
): Promise<VertexClientContext> {
  const { contracts, engineEndpoint, indexerEndpoint, triggerEndpoint } =
    ((): VertexClientContextOpts => {
      if (opts === 'testnet') {
        return {
          contracts: {
            querierAddress: VERTEX_DEPLOYMENTS.testnet.querier,
            spotEngineAddress: VERTEX_DEPLOYMENTS.testnet.spotEngine,
            perpEngineAddress: VERTEX_DEPLOYMENTS.testnet.perpEngine,
            clearinghouseAddress: VERTEX_DEPLOYMENTS.testnet.clearinghouse,
            endpointAddress: VERTEX_DEPLOYMENTS.testnet.endpoint,
          },
          engineEndpoint: ENGINE_CLIENT_ENDPOINTS.testnet,
          indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.testnet,
          triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.testnet,
        };
      }
      if (opts === 'mainnet') {
        return {
          contracts: {
            querierAddress: VERTEX_DEPLOYMENTS.mainnet.querier,
            spotEngineAddress: VERTEX_DEPLOYMENTS.mainnet.spotEngine,
            perpEngineAddress: VERTEX_DEPLOYMENTS.mainnet.perpEngine,
            clearinghouseAddress: VERTEX_DEPLOYMENTS.mainnet.clearinghouse,
            endpointAddress: VERTEX_DEPLOYMENTS.mainnet.endpoint,
          },
          engineEndpoint: ENGINE_CLIENT_ENDPOINTS.mainnet,
          indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.mainnet,
          triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.mainnet,
        };
      }
      if (opts === 'local') {
        return {
          contracts: {
            querierAddress: VERTEX_DEPLOYMENTS.local.querier,
            spotEngineAddress: VERTEX_DEPLOYMENTS.local.spotEngine,
            perpEngineAddress: VERTEX_DEPLOYMENTS.local.perpEngine,
            clearinghouseAddress: VERTEX_DEPLOYMENTS.local.clearinghouse,
            endpointAddress: VERTEX_DEPLOYMENTS.local.endpoint,
          },
          engineEndpoint: ENGINE_CLIENT_ENDPOINTS.local,
          indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.local,
          triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.local,
        };
      }
      return opts;
    })();
  const { signerOrProvider, linkedSigner } = signerOpts;

  const querier = FQuerier__factory.connect(
    contracts.querierAddress,
    signerOrProvider,
  );
  const clearinghouseAddress =
    contracts.clearinghouseAddress ?? (await querier.getClearinghouse());
  const clearinghouse = await IClearinghouse__factory.connect(
    clearinghouseAddress,
    signerOrProvider,
  );

  const endpointContractAddress =
    contracts.endpointAddress ?? (await clearinghouse.getEndpoint());
  const endpoint = await Endpoint__factory.connect(
    endpointContractAddress,
    signerOrProvider,
  );

  const spotAddress =
    contracts.spotEngineAddress ??
    (await clearinghouse.getEngineByType(ProductEngineType.SPOT));
  const perpAddress =
    contracts.perpEngineAddress ??
    (await clearinghouse.getEngineByType(ProductEngineType.PERP));

  const validSigner = Signer.isSigner(signerOrProvider)
    ? (signerOrProvider as ValidVertexSigner)
    : undefined;

  return {
    signerOrProvider: signerOrProvider,
    linkedSigner,
    contracts: {
      querier,
      clearinghouse,
      endpoint,
      spotEngine: ISpotEngine__factory.connect(spotAddress, signerOrProvider),
      perpEngine: IPerpEngine__factory.connect(perpAddress, signerOrProvider),
    },
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
