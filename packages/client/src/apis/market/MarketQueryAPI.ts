import { BaseVertexAPI } from '../base';

export class MarketQueryAPI extends BaseVertexAPI {
  // All markets from querier
  async getAllMarkets() {}

  // Orderbook price levels by product & specified per-side depth
  async getOrderbook() {}

  // Historical market prices by product
  async getHistoricalPrices() {}

  // Get orders by product
  // Add filters that makes sense (ex. by subaccount, pagniation, etc)
  async getMarketOrders() {}
}
