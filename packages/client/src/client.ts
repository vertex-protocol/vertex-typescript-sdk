import { VertexClientContext } from './context';
import { MarketAPI } from './apis/market';

export class VertexClient {
  readonly context: VertexClientContext;
  readonly market: MarketAPI;

  constructor(context: VertexClientContext) {
    this.context = context;

    this.market = new MarketAPI(context);
    // TODO: Subaccount, spot, perp
  }
}
