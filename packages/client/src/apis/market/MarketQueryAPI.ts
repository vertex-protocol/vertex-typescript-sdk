import { BaseVertexAPI } from '../base';
import { getAllMarkets, GetAllMarketsResponse } from '@vertex/contracts';

export class MarketQueryAPI extends BaseVertexAPI {
  // All markets from querier
  async getAllMarkets(): Promise<GetAllMarketsResponse> {
    return getAllMarkets(this.context.contracts);
  }

  // TODO: add stuff given by `@vertex/graph`
}
