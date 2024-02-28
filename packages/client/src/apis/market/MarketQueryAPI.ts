import {
  getAllMarkets,
  GetAllMarketsResponse,
} from '@vertex-protocol/contracts';
import {
  EngineQueryMarketLiquidityParams,
  EngineQueryMarketPriceParams,
  EngineQueryMarketPricesParams,
  EngineQueryMaxMintLpAmountParams,
  EngineQueryMaxOrderSizeParams,
  EngineQuerySubaccountOrdersParams,
  EngineQuerySubaccountProductOrdersParams,
  EngineQueryValidateOrderParams,
} from '@vertex-protocol/engine-client';
import {
  GetIndexerCandlesticksParams,
  GetIndexerFundingRateParams,
  GetIndexerMarketSnapshotsParams,
  GetIndexerMultiProductFundingRatesParams,
  GetIndexerMultiProductSnapshotsParams,
  GetIndexerOrdersParams,
  GetIndexerOrdersResponse,
  GetIndexerProductSnapshotsParams,
} from '@vertex-protocol/indexer-client';
import { BaseVertexAPI } from '../base';
import { QueryListTriggerOrdersParams } from './types';

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
   * @description Retrieve all spread health groups
   */
  async getHealthGroups() {
    return this.context.engineClient.getHealthGroups();
  }

  /**
   * @description Queries engine to determine if the order can be submitted within health requirements
   */
  async validateOrderParams(params: EngineQueryValidateOrderParams) {
    return this.context.engineClient.validateOrderParams(params);
  }

  /**
   * @description Queries the offchain engine to retrieve status of any open orders for the given subaccount
   * @param params
   */
  async getOpenSubaccountOrders(params: EngineQuerySubaccountOrdersParams) {
    return this.context.engineClient.getSubaccountOrders(params);
  }

  /**
   * @description Queries the offchain engine to retrieve status of any open orders for the given subaccount for multiple products
   * @param params
   */
  async getOpenSubaccountMultiProductOrders(
    params: EngineQuerySubaccountProductOrdersParams,
  ) {
    return this.context.engineClient.getSubaccountMultiProductOrders(params);
  }

  /**
   * @description Queries the offchain trigger service to list trigger orders. Requires a signature
   * @param params
   */
  async getTriggerOrders(params: QueryListTriggerOrdersParams) {
    return this.context.triggerClient.listTriggerOrders({
      ...params,
      chainId: await this.getSignerChainIdIfNeeded(params),
      verifyingAddr: params.verifyingAddr ?? this.getEndpointAddress(),
    });
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
  async getMaxOrderSize(params: EngineQueryMaxOrderSizeParams) {
    return this.context.engineClient.getMaxOrderSize(params);
  }

  /**
   * @description Queries engine to determine maximum base amount contribution for minting LPs
   * @param params
   */
  async getMaxMintLp(params: EngineQueryMaxMintLpAmountParams) {
    return this.context.engineClient.getMaxMintLpAmount(params);
  }

  /**
   * @description Retrieves liquidity per price tick from the engine. The engine will skip price levels that have no liquidity,
   * so it is not guaranteed that the bids/asks are evenly spaced
   */
  async getMarketLiquidity(params: EngineQueryMarketLiquidityParams) {
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
  async getLatestMarketPrice(params: EngineQueryMarketPriceParams) {
    return this.context.engineClient.getMarketPrice(params);
  }

  /**
   * @description Retrieves the latest off-chain orderbook price from the engine for multiple markets
   *
   * @param params
   */
  async getLatestMarketPrices(params: EngineQueryMarketPricesParams) {
    return this.context.engineClient.getMarketPrices(params);
  }

  /**
   * @description Retrieves the latest funding rate for a perp product
   *
   * @param params
   */
  async getFundingRate(params: GetIndexerFundingRateParams) {
    return this.context.indexerClient.getFundingRate(params);
  }

  /**
   * @description Retrieves the latest funding rate for multiple perp products
   *
   * @param params
   */
  async getMultiProductFundingRates(
    params: GetIndexerMultiProductFundingRatesParams,
  ) {
    return this.context.indexerClient.getMultiProductFundingRates(params);
  }

  /**
   * @description Retrieves the historical snapshots for a product from the indexer
   *
   * @param params
   */
  async getProductSnapshots(params: GetIndexerProductSnapshotsParams) {
    return this.context.indexerClient.getProductSnapshots(params);
  }

  /**
   * @description Retrieves the historical snapshots for a market from the indexer
   *
   * @param params
   */
  async getMarketSnapshots(params: GetIndexerMarketSnapshotsParams) {
    return this.context.indexerClient.getMarketSnapshots(params);
  }

  /**
   * @description Retrieves the historical snapshots for multiple products from the indexer
   *
   * @param params
   */
  async getMultiProductSnapshots(
    params: GetIndexerMultiProductSnapshotsParams,
  ) {
    return this.context.indexerClient.getMultiProductSnapshots(params);
  }
}
