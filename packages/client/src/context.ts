import {
  IClearinghouse__factory,
  IPerpEngine__factory,
  ISpotEngine__factory,
  IVertexQuerier__factory,
  ProductEngineType,
  VertexContracts,
} from '@vertex-protocol/contracts';
import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { VertexGraphClient } from '@vertex-protocol/graph';

export interface VertexClientContextOpts {
  // Address of the Vertex querier
  querierAddress: string;
  graphEndpoint?: string;
  // Must be a signer to use any contract executions
  signerOrProvider: Signer | Provider;
}

/**
 * Context required to use the Vertex client.
 */
export interface VertexClientContext {
  // Must be a signer to use any contract executions
  signerOrProvider: Signer | Provider;
  contracts: VertexContracts;
  graph: VertexGraphClient;
}

/**
 * Utility function to create client context from options
 *
 * @param opts
 */
export async function createClientContext(
  opts: VertexClientContextOpts,
): Promise<VertexClientContext> {
  const { querierAddress, graphEndpoint, signerOrProvider } = opts;
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
  };
}
