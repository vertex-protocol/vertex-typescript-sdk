import { BaseVertexAPI } from '../base';
import {
  getAllMarkets,
  GetAllMarketsResponse,
} from '@vertex-protocol/contracts';

export class MarketQueryAPI extends BaseVertexAPI {
  // All markets from querier
  async getAllMarkets(): Promise<GetAllMarketsResponse> {
    return getAllMarkets(this.context.contracts);
  }

  async getAllOrders() {
    // Get both enqueued and submitted orders by market ID, join by time
    // This is usually used for a running log of submitted orders
    // For these joins, expose dependency-less functions that can be used independently
  }

  async getOrdersForSubaccount() {
    // Get both enqueued and submitted orders by market ID but filtered by subaccount, join by time
  }

  async getOrdersById() {
    // Hit both enqueued and submitted, need to map to something that makes sense
  }

  async getMarketLiquidity() {
    // From min price inclusive to max price exclusive, hits only offchain book, as on-chain is filled
  }

  async getCandlesticks() {
    // Fetch candlesticks using graph
  }

  async getHourlyHistoricalMarketData() {
    // Just from graph
  }
}
