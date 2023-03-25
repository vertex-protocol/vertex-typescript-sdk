import { BaseVertexAPI } from '../base';
import {
  getAllMarkets,
  GetAllMarketsResponse,
} from '@vertex-protocol/contracts';
import {
  GetEngineMarketLiquidityParams,
  GetEngineMarketPriceParams,
  GetEngineMaxMintLpAmountParams,
  GetEngineMaxOrderSizeParams,
  GetEngineSubaccountOrdersParams,
  ValidateEngineOrderParams,
} from '@vertex-protocol/engine-client';
import {
  GetIndexerCandlesticksParams,
  GetIndexerFundingRateParams,
  GetIndexerOrdersParams,
  GetIndexerOrdersResponse,
  GetIndexerProductSnapshotsParams,
} from '@vertex-protocol/indexer-client';

export class MarketQueryAPI extends BaseVertexAPI {
  /**
   * @description Retrieve all market states from the on-chain contracts
   */
  async getAllMarkets(): Promise<GetAllMarketsResponse> {
    return getAllMarkets(this.context.contracts);
  }

  /**
   * @description Retrieves all market states from the offchain engine
   */
  async getAllEngineMarkets(): Promise<GetAllMarketsResponse> {
    return this.context.engineClient.getAllMarkets();
  }

  /**
   * @description Queries engine to determine if the order can be submitted within health requirements
   */
  async validateOrderParams(params: ValidateEngineOrderParams) {
    return this.context.engineClient.validateOrderParams(params);
  }

  /**
   * @description Queries the offchain engine to retrieve status of any open orders for the given subaccount
   * @param params
   */
  async getOpenSubaccountOrders(params: GetEngineSubaccountOrdersParams) {
    return this.context.engineClient.getSubaccountOrders(params);
  }

  /**
   * @description Queries indexer to fetch historical orders
   *
   * @param params
   */
  async getHistoricalOrders(
    params: GetIndexerOrdersParams,
  ): Promise<GetIndexerOrdersResponse> {
    return this.context.indexerClient.getOrders(params);
  }

  /**
   * @description Queries engine to determine maximum order size
   * @param params
   */
  async getMaxOrderSize(params: GetEngineMaxOrderSizeParams) {
    return this.context.engineClient.getMaxOrderSize(params);
  }

  /**
   * @description Queries engine to determine maximum base amount contribution for minting LPs
   * @param params
   */
  async getMaxMintLp(params: GetEngineMaxMintLpAmountParams) {
    return this.context.engineClient.getMaxMintLpAmount(params);
  }

  /**
   * @description Retrieves liquidity per price tick from the engine. The engine will skip price levels that have no liquidity,
   * so it is not guaranteed that the bids/asks are evenly spaced
   */
  async getMarketLiquidity(params: GetEngineMarketLiquidityParams) {
    return this.context.engineClient.getMarketLiquidity(params);
  }

  /**
   * @description Historical candlesticks from the indexer, use getLatestMarketPrice for the latest orderbook prices
   *
   * @param params
   */
  async getCandlesticks(params: GetIndexerCandlesticksParams) {
    return this.context.indexerClient.getCandlesticks(params);
  }

  /**
   * @description Retrieves the latest off-chain orderbook price from the engine
   *
   * @param params
   */
  async getLatestMarketPrice(params: GetEngineMarketPriceParams) {
    return this.context.engineClient.getMarketPrice(params);
  }

  /**
   * @description Retrieves the latest funding rate for perp products
   *
   * @param params
   */
  async getFundingRate(params: GetIndexerFundingRateParams) {
    return this.context.indexerClient.getFundingRate(params);
  }

  /**
   * @description Retrieves the historical snapshots for a product for the indexer
   *
   * @param params
   */
  async getProductSnapshots(params: GetIndexerProductSnapshotsParams) {
    return this.context.indexerClient.getProductSnapshots(params);
  }
}
