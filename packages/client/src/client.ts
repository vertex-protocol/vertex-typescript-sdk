import { Signer } from 'ethers';
import { MarketAPI } from './apis/market';
import { PerpAPI } from './apis/perp';
import { RewardsAPI } from './apis/rewards';
import { SpotAPI } from './apis/spot';
import { SubaccountAPI } from './apis/subaccount';
import { WebsocketAPI } from './apis/ws';
import { createClientContext, VertexClientContext } from './context';

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
  setSignerOrProvider(
    signerOrProvider: VertexClientContext['signerOrProvider'],
  ) {
    const newContext = createClientContext(
      {
        contractAddresses: this.context.contractAddresses,
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
