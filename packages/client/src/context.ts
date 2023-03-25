import {
  FQuerier__factory,
  IClearinghouse__factory,
  IEndpoint__factory,
  IPerpEngine__factory,
  ISpotEngine__factory,
  ProductEngineType,
  VERTEX_DEPLOYMENTS,
  VertexContracts,
} from '@vertex-protocol/contracts';
import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import {
  GRAPH_CLIENT_ENDPOINTS,
  GraphClientOpts,
  VertexGraphClient,
} from '@vertex-protocol/graph';
import { TypedDataSigner } from '@ethersproject/abstract-signer';
import {
  ENGINE_CLIENT_ENDPOINTS,
  EngineClient,
} from '@vertex-protocol/engine-client';
import {
  INDEXER_CLIENT_ENDPOINTS,
  IndexerClient,
} from '@vertex-protocol/indexer-client';

/**
 * Context required to use the Vertex client.
 */
export interface VertexClientContext {
  // Must be a signer to use any contract executions, used for queries/executions to the chain
  chainSignerOrProvider: Signer | Provider;
  // Signer for offchain engine transactions, defaults to chainSignerOrProvider, this can be overridden
  // in cases like the frontend, where we can allow signers on a different chain to execute transactions
  engineSigner?: TypedDataSigner & Signer;
  contracts: VertexContracts;
  graph: VertexGraphClient;
  engineClient: EngineClient;
  indexerClient: IndexerClient;
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
  graph: GraphClientOpts;
  engineEndpoint: string;
  indexerEndpoint: string;
}

/**
 * Args for signing configuration for creating a context
 */
export interface CreateVertexClientContextSignerOpts
  extends Pick<VertexClientContext, 'chainSignerOrProvider' | 'engineSigner'> {
  // Override the EIP712 signing chain ID, otherwise the chain ID of the engineSigner will be used
  engineSigningChainId?: number;
}

export type CreateVertexClientContextOpts =
  | VertexClientContextOpts
  | 'testnet'
  | 'mainnet';

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
  const { contracts, graph, engineEndpoint, indexerEndpoint } =
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
          graph: {
            coreEndpoint: GRAPH_CLIENT_ENDPOINTS.testnet.core,
            marketsEndpoint: GRAPH_CLIENT_ENDPOINTS.testnet.markets,
            candlesticksEndpoint: GRAPH_CLIENT_ENDPOINTS.testnet.candlesticks,
          },
          engineEndpoint: ENGINE_CLIENT_ENDPOINTS.testnet,
          indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.testnet,
        };
      } else if (opts === 'mainnet') {
        return {
          contracts: {
            querierAddress: VERTEX_DEPLOYMENTS.mainnet.querier,
            spotEngineAddress: VERTEX_DEPLOYMENTS.mainnet.spotEngine,
            perpEngineAddress: VERTEX_DEPLOYMENTS.mainnet.perpEngine,
            clearinghouseAddress: VERTEX_DEPLOYMENTS.mainnet.clearinghouse,
            endpointAddress: VERTEX_DEPLOYMENTS.mainnet.endpoint,
          },
          graph: {
            coreEndpoint: GRAPH_CLIENT_ENDPOINTS.mainnet.core,
            marketsEndpoint: GRAPH_CLIENT_ENDPOINTS.mainnet.markets,
            candlesticksEndpoint: GRAPH_CLIENT_ENDPOINTS.mainnet.candlesticks,
          },
          engineEndpoint: ENGINE_CLIENT_ENDPOINTS.mainnet,
          indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.mainnet,
        };
      } else {
        return opts;
      }
    })();
  const { chainSignerOrProvider, engineSigner: engineSignerParam } = signerOpts;

  const querier = FQuerier__factory.connect(
    contracts.querierAddress,
    chainSignerOrProvider,
  );
  const clearinghouseAddress =
    contracts.clearinghouseAddress ?? (await querier.getClearinghouse());
  const clearinghouse = await IClearinghouse__factory.connect(
    clearinghouseAddress,
    chainSignerOrProvider,
  );

  const endpointContractAddress =
    contracts.endpointAddress ?? (await clearinghouse.getEndpoint());
  const endpoint = await IEndpoint__factory.connect(
    endpointContractAddress,
    chainSignerOrProvider,
  );

  const spotAddress =
    contracts.spotEngineAddress ??
    (await clearinghouse.getEngineByType(ProductEngineType.SPOT));
  const perpAddress =
    contracts.perpEngineAddress ??
    (await clearinghouse.getEngineByType(ProductEngineType.PERP));

  // TODO: hack - better checking here
  const chainTypedDataSigner =
    chainSignerOrProvider instanceof Signer
      ? (chainSignerOrProvider as TypedDataSigner & Signer)
      : undefined;
  const engineSigner = engineSignerParam ?? chainTypedDataSigner;

  return {
    chainSignerOrProvider: chainSignerOrProvider,
    engineSigner: engineSigner,
    contracts: {
      querier,
      clearinghouse,
      endpoint,
      spotEngine: ISpotEngine__factory.connect(
        spotAddress,
        chainSignerOrProvider,
      ),
      perpEngine: IPerpEngine__factory.connect(
        perpAddress,
        chainSignerOrProvider,
      ),
    },
    graph: new VertexGraphClient(graph),
    engineClient: new EngineClient({
      url: engineEndpoint,
      signer: engineSigner,
      signingChainId: signerOpts.engineSigningChainId,
    }),
    indexerClient: new IndexerClient({
      url: indexerEndpoint,
    }),
  };
}
