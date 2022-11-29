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
}

/**
 * Args for creating a context
 */
interface VertexClientContextOpts {
  // Address of the Vertex querier
  querierAddress: string;
  graph: GraphClientOpts;
  offchainEngineEndpoint: string;
}

/**
 * Args for signing configuration for creating a context
 */
export interface CreateVertexClientContextSignerOpts
  extends Pick<VertexClientContext, 'chainSignerOrProvider' | 'engineSigner'> {
  // Override the EIP712 signing chain ID, otherwise the chain ID of the engineSigner will be used
  engineSigningChainId?: number;
}

export type CreateVertexClientContextOpts = VertexClientContextOpts | 'testnet';

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
  const { querierAddress, graph, offchainEngineEndpoint } =
    ((): VertexClientContextOpts => {
      if (opts === 'testnet') {
        return {
          querierAddress: VERTEX_DEPLOYMENTS.testnet.querier,
          graph: {
            coreEndpoint: GRAPH_CLIENT_ENDPOINTS.testnet.core,
            marketsEndpoint: GRAPH_CLIENT_ENDPOINTS.testnet.markets,
            candlesticksEndpoint: GRAPH_CLIENT_ENDPOINTS.testnet.candlesticks,
          },
          offchainEngineEndpoint: ENGINE_CLIENT_ENDPOINTS.testnet,
        };
      } else {
        return opts;
      }
    })();
  const { chainSignerOrProvider, engineSigner: engineSignerParam } = signerOpts;

  const querier = FQuerier__factory.connect(
    querierAddress,
    chainSignerOrProvider,
  );
  const clearinghouseAddress = await querier.getClearinghouse();
  const clearinghouse = await IClearinghouse__factory.connect(
    clearinghouseAddress,
    chainSignerOrProvider,
  );

  const endpointContractAddress = await clearinghouse.getEndpoint();
  const endpoint = await IEndpoint__factory.connect(
    endpointContractAddress,
    chainSignerOrProvider,
  );

  const spotAddress = await clearinghouse.getEngineByType(
    ProductEngineType.SPOT,
  );
  const perpAddress = await clearinghouse.getEngineByType(
    ProductEngineType.PERP,
  );

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
      url: offchainEngineEndpoint,
      signer: engineSigner,
      signingChainId: signerOpts.engineSigningChainId,
    }),
  };
}
