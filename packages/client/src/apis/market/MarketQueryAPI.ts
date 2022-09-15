import { BaseVertexAPI } from '../base';
import {
  getAllMarkets,
  GetAllMarketsResponse,
} from '@vertex-protocol/contracts';
import {
  GetOrdersForSubaccountParams,
  GetOrdersForSubaccountResponse,
} from './queryTypes';
import { GetCandlesticksParams } from '@vertex-protocol/graph';
import { GetEngineMarketPriceParams } from '@vertex-protocol/engine-client';

export class MarketQueryAPI extends BaseVertexAPI {
  // All markets from querier
  async getAllMarkets(): Promise<GetAllMarketsResponse> {
    return getAllMarkets(this.context.contracts);
  }

  async getOrValidateOrders() {
    // Call validateTransactions
  }

  async getLatestSubmittedOrders() {
    // Get both enqueued and submitted orders by market ID, join by time
    // This is usually used for a running log of submitted orders
    // For these joins, expose dependency-less functions that can be used independently
  }

  async getOrdersForSubaccount(
    params: GetOrdersForSubaccountParams,
  ): Promise<GetOrdersForSubaccountResponse> {
    // TODO: Impl graph for historical
    return {
      engineOrders: (
        await this.context.engineClient.getSubaccountOrders(params)
      ).orders,
    };
  }

  async getOrdersById() {
    // Hit both enqueued and submitted, need to map to something that makes sense
  }

  async getMarketLiquidity() {
    // From min price inclusive to max price exclusive, hits only offchain book, as on-chain is filled
  }

  /**
   * Historical candlesticks from the Graph, use getLatestMarketPrice for the latest orderbook prices
   *
   * @param params
   */
  async getCandlesticks(params: GetCandlesticksParams) {
    return this.context.graph.getCandlesticks(params);
  }

  /**
   * Retrieves the latest off-chain orderbook price from the engine
   *
   * @param params
   */
  async getLatestMarketPrice(params: GetEngineMarketPriceParams) {
    return this.context.engineClient.getMarketPrice(params);
  }

  async getHourlyHistoricalMarketData() {
    // Just from graph
  }
}
