import { createClientContext, VertexClientContext } from './context';
import { MarketAPI } from './apis/market';
import { SubaccountAPI } from './apis/subaccount';
import { SpotAPI } from './apis/spot';
import { PerpAPI } from './apis/perp';
import { WebsocketAPI } from './apis/ws';
import { ValidVertexSigner } from '@vertex-protocol/contracts';

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
   * @param linkedSigner
   */
  setLinkedSigner(linkedSigner: ValidVertexSigner | null) {
    // This is a bit ugly, but works for now
    this.context.linkedSigner = linkedSigner ?? undefined;
    this.context.engineClient.setLinkedSigner(linkedSigner);
  }

  /**
   * Sets the signer or provider for the client. Will cause a full reload of the current context.
   * @param signerOrProvider
   */
  async setSignerOrProvider(
    signerOrProvider: VertexClientContext['signerOrProvider'],
  ) {
    const newContext = await createClientContext(
      {
        contracts: {
          querierAddress: this.context.contracts.querier.address,
          spotEngineAddress: this.context.contracts.spotEngine.address,
          perpEngineAddress: this.context.contracts.perpEngine.address,
          clearinghouseAddress: this.context.contracts.clearinghouse.address,
          endpointAddress: this.context.contracts.endpoint.address,
        },
        engineEndpoint: this.context.engineClient.opts.url,
        indexerEndpoint: this.context.indexerClient.opts.url,
      },
      {
        signerOrProvider,
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
    this.ws = new WebsocketAPI(context);
  }
}
