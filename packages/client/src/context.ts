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
  ProductEngineType,
  VERTEX_DEPLOYMENTS,
  VertexContracts,
  VertexDeploymentAddresses,
} from '@vertex-protocol/contracts';
import { Provider, Signer } from 'ethers';
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
  // Contract addresses
  contracts: {
    // Only the querier is required, but you can specify all the contracts to minimize RPC calls
    querierAddress: string;
    spotEngineAddress?: string;
    perpEngineAddress?: string;
    clearinghouseAddress?: string;
    endpointAddress?: string;
    arbAirdropAddress: string;
    // VRTX related addresses
    vrtxTokenAddress: string;
    vrtxAirdropAddress: string;
    vrtxLbaAddress: string;
    vrtxVestingAddress: string;
    vrtxStakingAddress: string;
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
            arbAirdropAddress: VERTEX_DEPLOYMENTS.testnet.arbAirdrop,
            vrtxTokenAddress: VERTEX_DEPLOYMENTS.testnet.vrtxToken,
            vrtxAirdropAddress: VERTEX_DEPLOYMENTS.testnet.vrtxAirdrop,
            vrtxLbaAddress: VERTEX_DEPLOYMENTS.testnet.vrtxLba,
            vrtxVestingAddress: VERTEX_DEPLOYMENTS.testnet.vrtxVesting,
            vrtxStakingAddress: VERTEX_DEPLOYMENTS.testnet.vrtxStaking,
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
            arbAirdropAddress: VERTEX_DEPLOYMENTS.mainnet.arbAirdrop,
            vrtxTokenAddress: VERTEX_DEPLOYMENTS.mainnet.vrtxToken,
            vrtxAirdropAddress: VERTEX_DEPLOYMENTS.mainnet.vrtxAirdrop,
            vrtxLbaAddress: VERTEX_DEPLOYMENTS.mainnet.vrtxLba,
            vrtxVestingAddress: VERTEX_DEPLOYMENTS.mainnet.vrtxVesting,
            vrtxStakingAddress: VERTEX_DEPLOYMENTS.mainnet.vrtxStaking,
          },
          engineEndpoint: ENGINE_CLIENT_ENDPOINTS.mainnet,
          indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.mainnet,
          triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.mainnet,
        };
      }
      if (opts === 'mantleTestnet') {
        return {
          contracts: {
            querierAddress: VERTEX_DEPLOYMENTS.mantleTestnet.querier,
            spotEngineAddress: VERTEX_DEPLOYMENTS.mantleTestnet.spotEngine,
            perpEngineAddress: VERTEX_DEPLOYMENTS.mantleTestnet.perpEngine,
            clearinghouseAddress:
              VERTEX_DEPLOYMENTS.mantleTestnet.clearinghouse,
            endpointAddress: VERTEX_DEPLOYMENTS.mantleTestnet.endpoint,
            arbAirdropAddress: VERTEX_DEPLOYMENTS.mantleTestnet.arbAirdrop,
            vrtxTokenAddress: VERTEX_DEPLOYMENTS.mantleTestnet.vrtxToken,
            vrtxAirdropAddress: VERTEX_DEPLOYMENTS.mantleTestnet.vrtxAirdrop,
            vrtxLbaAddress: VERTEX_DEPLOYMENTS.mantleTestnet.vrtxLba,
            vrtxVestingAddress: VERTEX_DEPLOYMENTS.mantleTestnet.vrtxVesting,
            vrtxStakingAddress: VERTEX_DEPLOYMENTS.mantleTestnet.vrtxStaking,
          },
          engineEndpoint: ENGINE_CLIENT_ENDPOINTS.mantleTestnet,
          indexerEndpoint: INDEXER_CLIENT_ENDPOINTS.mantleTestnet,
          triggerEndpoint: TRIGGER_CLIENT_ENDPOINTS.mantleTestnet,
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
            arbAirdropAddress: VERTEX_DEPLOYMENTS.local.arbAirdrop,
            vrtxTokenAddress: VERTEX_DEPLOYMENTS.local.vrtxToken,
            vrtxAirdropAddress: VERTEX_DEPLOYMENTS.local.vrtxAirdrop,
            vrtxLbaAddress: VERTEX_DEPLOYMENTS.local.vrtxLba,
            vrtxVestingAddress: VERTEX_DEPLOYMENTS.local.vrtxVesting,
            vrtxStakingAddress: VERTEX_DEPLOYMENTS.local.vrtxStaking,
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

  const validSigner = isSigner(signerOrProvider)
    ? (signerOrProvider as Signer)
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
      arbAirdrop: IArbAirdrop__factory.connect(
        contracts.arbAirdropAddress,
        signerOrProvider,
      ),
      vrtxToken: IERC20__factory.connect(
        contracts.vrtxTokenAddress,
        signerOrProvider,
      ),
      vrtxAirdrop: IAirdrop__factory.connect(
        contracts.vrtxAirdropAddress,
        signerOrProvider,
      ),
      vrtxLba: ILBA__factory.connect(
        contracts.vrtxLbaAddress,
        signerOrProvider,
      ),
      vrtxVesting: IVesting__factory.connect(
        contracts.vrtxVestingAddress,
        signerOrProvider,
      ),
      vrtxStaking: IStaking__factory.connect(
        contracts.vrtxStakingAddress,
        signerOrProvider,
      ),
    },
    contractAddresses: {
      querier: contracts.querierAddress,
      clearinghouse: clearinghouseAddress,
      endpoint: endpointContractAddress,
      spotEngine: spotAddress,
      perpEngine: perpAddress,
      arbAirdrop: contracts.arbAirdropAddress,
      vrtxToken: contracts.vrtxTokenAddress,
      vrtxAirdrop: contracts.vrtxAirdropAddress,
      vrtxLba: contracts.vrtxLbaAddress,
      vrtxVesting: contracts.vrtxVestingAddress,
      vrtxStaking: contracts.vrtxStakingAddress,
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
