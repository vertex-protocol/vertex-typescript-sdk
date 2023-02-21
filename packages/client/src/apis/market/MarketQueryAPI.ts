import { BaseVertexAPI } from '../base';
import {
  getAllMarkets,
  GetAllMarketsResponse,
} from '@vertex-protocol/contracts';
import { GetCandlesticksParams } from '@vertex-protocol/graph';
import {
  GetEngineFundingRateParams,
  GetEngineMarketLiquidityParams,
  GetEngineMarketPriceParams,
  GetEngineMaxOrderSizeParams,
  GetEngineSubaccountOrdersParams,
  ValidateEngineOrderParams,
} from '@vertex-protocol/engine-client';
import { GetOrderByDigestParams, GetOrderByDigestResponse } from './queryTypes';

export class MarketQueryAPI extends BaseVertexAPI {
  /**
   * Retrieve all market states from the on-chain contracts
   */
  async getAllMarkets(): Promise<GetAllMarketsResponse> {
    return getAllMarkets(this.context.contracts);
  }

  /**
   * Retrieves all market states from the offchain engine
   */
  async getAllEngineMarkets(): Promise<GetAllMarketsResponse> {
    return this.context.engineClient.getAllMarkets();
  }

  /**
   * Queries engine to determine if the order can be submitted within health requirements
   */
  async validateOrderParams(params: ValidateEngineOrderParams) {
    return this.context.engineClient.validateOrderParams(params);
  }

  /**
   * Queries the offchain engine to retrieve status of any open orders for the given subaccount
   * @param params
   */
  async getOpenSubaccountOrders(params: GetEngineSubaccountOrdersParams) {
    return this.context.engineClient.getSubaccountOrders(params);
  }

  /**
   * Queries both the engine and the graph to retrieve an order by its digest
   * @param params
   */
  async getOrderByDigest(
    params: GetOrderByDigestParams,
  ): Promise<GetOrderByDigestResponse> {
    const engineResponse = await this.context.engineClient.getOrder(params);
    const graphResponse = await this.context.graph.getOrderByDigest(params);

    return {
      engine: engineResponse,
      graph: graphResponse,
    };
  }

  /**
   * Queries engine to determine maximum order size
   * @param params
   */
  async getMaxOrderSize(params: GetEngineMaxOrderSizeParams) {
    return this.context.engineClient.getMaxOrderSize(params);
  }

  /**
   * Queries engine to get subaccount order fee rates
   * @param params
   */
  async getSubaccountOrderFeeRates(params: GetEngineSubaccountOrdersParams) {
    return this.context.engineClient.getSubaccountFeeRates(params);
  }

  /**
   * Retrieves liquidity per price tick from the engine. The engine will skip price levels that have no liquidity,
   * so it is not guaranteed that the bids/asks are evenly spaced
   */
  async getMarketLiquidity(params: GetEngineMarketLiquidityParams) {
    return this.context.engineClient.getMarketLiquidity(params);
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

  /**
   * Retrieves the latest funding rate for perp products
   *
   * @param params
   */
  async getFundingRate(params: GetEngineFundingRateParams) {
    return this.context.engineClient.getFundingRate(params);
  }
}
