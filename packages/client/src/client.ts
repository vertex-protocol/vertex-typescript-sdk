import { WalletClientWithAccount } from '@vertex-protocol/contracts';
import { MarketAPI } from './apis/market';
import { PerpAPI } from './apis/perp';
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
  ws!: WebsocketAPI;

  constructor(context: VertexClientContext) {
    this.setupFromContext(context);
  }

  /**
   * Sets the linked signer for the client. Set to null to revert to the chain signer.
   * @param linkedSignerWalletClient
   */
  setLinkedSigner(linkedSignerWalletClient: WalletClientWithAccount | null) {
    // This is a bit ugly, but works for now
    this.context.linkedSignerWalletClient =
      linkedSignerWalletClient ?? undefined;
    this.context.engineClient.setLinkedSigner(linkedSignerWalletClient);
    this.context.triggerClient.setLinkedSigner(linkedSignerWalletClient);
  }

  /**
   * Sets the WalletClient for the client. Will cause a full reload of the current context.
   * @param walletClient
   */
  setWalletClient(walletClient: VertexClientContext['walletClient']) {
    const newContext = createClientContext(
      {
        contractAddresses: this.context.contractAddresses,
        engineEndpoint: this.context.engineClient.opts.url,
        indexerEndpoint: this.context.indexerClient.opts.url,
        triggerEndpoint: this.context.triggerClient.opts.url,
      },
      {
        walletClient,
        // No need to call setLinkedSigner as this property doesn't change
        linkedSignerWalletClient: this.context.linkedSignerWalletClient,
        publicClient: this.context.publicClient,
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
    this.ws = new WebsocketAPI(context);
  }
}
