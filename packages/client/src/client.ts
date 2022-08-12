import { VertexClientContext } from './context';
import { MarketAPI } from './apis/market';
import { SubaccountAPI } from './apis/subaccount';
import { SpotAPI } from './apis/spot';
import { PerpAPI } from './apis/perp';

export class VertexClient {
  readonly context: VertexClientContext;
  readonly market: MarketAPI;
  readonly subaccount: SubaccountAPI;
  readonly spot: SpotAPI;
  readonly perp: PerpAPI;

  constructor(context: VertexClientContext) {
    this.context = context;

    this.market = new MarketAPI(context);
    this.subaccount = new SubaccountAPI(context);
    this.spot = new SpotAPI(context);
    this.perp = new PerpAPI(context);
  }
}
