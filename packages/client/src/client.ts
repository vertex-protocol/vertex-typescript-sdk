import { createClientContext, VertexClientContext } from './context';
import { MarketAPI } from './apis/market';
import { SubaccountAPI } from './apis/subaccount';
import { SpotAPI } from './apis/spot';
import { PerpAPI } from './apis/perp';
import { WebsocketAPI } from './apis/ws';
import { Signer } from 'ethers';
import { RewardsAPI } from './apis/rewards';

/**
 * Client for querying and executing against Vertex Clearinghouse.
 * Usually not instantiated directly. Instead, use {@link createVertexClient:CLIENT}.
 */
export class VertexClient {
  context!: VertexClientContext;
  market!: MarketAPI;
  subaccount!: SubaccountAPI;
  spot!: SpotAPI;
  perp!: PerpAPI;
  rewards!: RewardsAPI;
  ws!: WebsocketAPI;

  constructor(context: VertexClientContext) {
    this.setupFromContext(context);
  }

  /**
   * Sets the linked signer for the client. Set to null to revert to the chain signer.
   * @param linkedSigner
   */
  setLinkedSigner(linkedSigner: Signer | null) {
    // This is a bit ugly, but works for now
    this.context.linkedSigner = linkedSigner ?? undefined;
    this.context.engineClient.setLinkedSigner(linkedSigner);
    this.context.triggerClient.setLinkedSigner(linkedSigner);
  }

  /**
   * Sets the signer or provider for the client. Will cause a full reload of the current context.
   * @param signerOrProvider
   */
  async setSignerOrProvider(
    signerOrProvider: VertexClientContext['signerOrProvider'],
  ) {
    const {
      clearinghouse,
      endpoint,
      perpEngine,
      querier,
      spotEngine,
      vrtxAirdrop,
      vrtxLba,
      vrtxToken,
      vrtxVesting,
      vrtxStaking,
    } = this.context.contractAddresses;

    const newContext = await createClientContext(
      {
        contracts: {
          querierAddress: querier,
          spotEngineAddress: spotEngine,
          perpEngineAddress: perpEngine,
          clearinghouseAddress: clearinghouse,
          endpointAddress: endpoint,
          vrtxTokenAddress: vrtxToken,
          vrtxAirdropAddress: vrtxAirdrop,
          vrtxLbaAddress: vrtxLba,
          vrtxVestingAddress: vrtxVesting,
          vrtxStakingAddress: vrtxStaking,
        },
        engineEndpoint: this.context.engineClient.opts.url,
        indexerEndpoint: this.context.indexerClient.opts.url,
        triggerEndpoint: this.context.triggerClient.opts.url,
      },
      {
        signerOrProvider,
        // No need to call setLinkedSigner as this property doesn't change
        linkedSigner: this.context.linkedSigner,
      },
    );
    this.setupFromContext(newContext);
  }

  private setupFromContext(context: VertexClientContext) {
    this.context = context;
    this.market = new MarketAPI(context);
    this.subaccount = new SubaccountAPI(context);
    this.spot = new SpotAPI(context);
    this.perp = new PerpAPI(context);
    this.rewards = new RewardsAPI(context);
    this.ws = new WebsocketAPI(context);
  }
}
