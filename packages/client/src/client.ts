import { ValidVertexSigner, VertexClientContext } from './context';
import { MarketAPI } from './apis/market';
import { SubaccountAPI } from './apis/subaccount';
import { SpotAPI } from './apis/spot';
import { PerpAPI } from './apis/perp';
import { WebsocketAPI } from './apis/ws';

/**
 * Client for querying and executing against Vertex Clearinghouse.
 * Usually not instantiated directly. Instead, use {@link createVertexClient:CLIENT}.
 */
export class VertexClient {
  readonly context: VertexClientContext;
  readonly market: MarketAPI;
  readonly subaccount: SubaccountAPI;
  readonly spot: SpotAPI;
  readonly perp: PerpAPI;
  readonly ws: WebsocketAPI;

  constructor(context: VertexClientContext) {
    this.context = context;

    this.market = new MarketAPI(context);
    this.subaccount = new SubaccountAPI(context);
    this.spot = new SpotAPI(context);
    this.perp = new PerpAPI(context);
    this.ws = new WebsocketAPI(context);
  }

  /**
   * Sets the linked signer for the client. Set to null to revert to the chain signer.
   * @param linkedSigner
   */
  setLinkedSigner(linkedSigner: ValidVertexSigner | null) {
    // This is a bit ugly, but works for now
    this.context.linkedSigner = linkedSigner ?? undefined;
    this.context.engineClient.setLinkedSigner(linkedSigner);
  }
}
