import {
  IClearinghouse__factory,
  IPerpEngine__factory,
  ISpotEngine__factory,
  IVertexQuerier__factory,
  ProductEngineType,
  VERTEX_DEPLOYMENTS,
  VertexContracts,
} from '@vertex-protocol/contracts';
import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import {
  GRAPH_CLIENT_ENDPOINTS,
  VertexGraphClient,
} from '@vertex-protocol/graph';
import { ORDERS_CLIENT_ENDPOINTS, OrdersClient } from '@vertex-protocol/orders';

interface VertexClientContextOpts {
  // Address of the Vertex querier
  querierAddress: string;
  graphEndpoint: string;
  offchainEngineEndpoint: string;
}

export type CreateVertexClientContextOpts = VertexClientContextOpts | 'testnet';

/**
 * Context required to use the Vertex client.
 */
export interface VertexClientContext {
  // Must be a signer to use any contract executions
  signerOrProvider: Signer | Provider;
  contracts: VertexContracts;
  graph: VertexGraphClient;
  offchainEngine: OrdersClient;
}

/**
 * Utility function to create client context from options
 *
 * @param opts
 */
export async function createClientContext(
  opts: CreateVertexClientContextOpts,
  // Must be a signer to use any contract executions
  signerOrProvider: Signer | Provider,
): Promise<VertexClientContext> {
  const { querierAddress, graphEndpoint, offchainEngineEndpoint } = (() => {
    if (opts === 'testnet') {
      return {
        querierAddress: VERTEX_DEPLOYMENTS.testnet.querier,
        graphEndpoint: GRAPH_CLIENT_ENDPOINTS.testnet,
        offchainEngineEndpoint: ORDERS_CLIENT_ENDPOINTS.testnet,
      };
    } else {
      return opts;
    }
  })();
  const querier = IVertexQuerier__factory.connect(
    querierAddress,
    signerOrProvider,
  );
  const clearinghouseAddress = (await querier.getConfig()).clearinghouse;
  const clearinghouse = await IClearinghouse__factory.connect(
    clearinghouseAddress,
    signerOrProvider,
  );

  const spotAddress = await clearinghouse.getEngineByType(
    ProductEngineType.SPOT,
  );
  const perpAddress = await clearinghouse.getEngineByType(
    ProductEngineType.PERP,
  );

  return {
    signerOrProvider,
    contracts: {
      querier,
      clearinghouse,
      spotEngine: ISpotEngine__factory.connect(spotAddress, signerOrProvider),
      perpEngine: IPerpEngine__factory.connect(perpAddress, signerOrProvider),
    },
    graph: new VertexGraphClient({ endpoint: graphEndpoint }),
    offchainEngine: new OrdersClient({ endpoint: offchainEngineEndpoint }),
  };
}
