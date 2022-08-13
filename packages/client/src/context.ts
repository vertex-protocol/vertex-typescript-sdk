import {
  IClearinghouse__factory,
  IPerpEngine__factory,
  ISpotEngine__factory,
  IVertexQuerier__factory,
  ProductEngineType,
  VertexContracts,
} from '@vertex/contracts';
import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { VertexGraphClient } from '@vertex/graph';

export interface VertexClientContextOpts {
  querierAddress: string;
  graphEndpoint?: string;
  signerOrProvider: Signer | Provider;
}

export interface VertexClientContext {
  signerOrProvider: Signer | Provider;
  contracts: VertexContracts;
  graph: VertexGraphClient;
}

export async function createClientContext({
  querierAddress,
  graphEndpoint,
  signerOrProvider,
}: VertexClientContextOpts): Promise<VertexClientContext> {
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
