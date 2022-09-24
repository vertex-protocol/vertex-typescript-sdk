import { EngineBaseClient } from './EngineBaseClient';
import {
  encodeSignedOrder,
  MarketWithProduct,
} from '@vertex-protocol/contracts';
import { BigNumber } from 'ethers';
import { fromX18, toBigDecimal } from '@vertex-protocol/utils';
import {
  GetEngineAllMarketsResponse,
  GetEngineMarketLiquidityParams,
  GetEngineMarketLiquidityResponse,
  GetEngineMarketPriceParams,
  GetEngineMarketPriceResponse,
  GetEngineOrderParams,
  GetEngineOrderResponse,
  GetEngineSubaccountOrdersParams,
  GetEngineSubaccountOrdersResponse,
  GetEngineSubaccountSummaryParams,
  GetEngineSubaccountSummaryResponse,
  ValidateEngineOrderParams,
  ValidateEngineOrderResponse,
  ValidateSignedEngineOrderParams,
} from './types';
import {
  mapEngineServerOrder,
  mapEngineServerPerpProduct,
  mapEngineServerSpotProduct,
  mapEngineServerTickLiquidity,
} from './queryDataMappers';

export class EngineQueryClient extends EngineBaseClient {
  /**
   * Retrieves a subaccount summary reflective of the state within the offchain engine. This adheres to the
   * same return interface as the contract version
   *
   * @param params
   */
  async getSubaccountSummary(
    params: GetEngineSubaccountSummaryParams,
  ): Promise<GetEngineSubaccountSummaryResponse> {
    const baseResponse = await this.query('subaccount_info', {
      subaccount_id: BigNumber.from(params.subaccountId).toNumber(),
    });
    const balances: GetEngineSubaccountSummaryResponse['balances'] = [];

    baseResponse.spot_balances.forEach((spotBalance) => {
      const product = baseResponse.all_products.spot_products.find(
        (product) => product.product_id === spotBalance.product_id,
      );
      if (!product) {
        throw Error(`Could not find product ${spotBalance.product_id}`);
      }

      balances.push({
        amount: fromX18(spotBalance.amount_x18),
        health: {
          initial: toBigDecimal(spotBalance.initial_x18),
          maintenance: toBigDecimal(spotBalance.maintenance_x18),
          unweighted: toBigDecimal(spotBalance.pnl_x18),
        },
        productId: product.product_id,
        ...mapEngineServerSpotProduct(product).product,
      });
    });

    baseResponse.perp_balances.forEach((perpBalance) => {
      const product = baseResponse.all_products.perp_products.find(
        (product) => product.product_id === perpBalance.product_id,
      );
      if (!product) {
        throw Error(`Could not find product ${perpBalance.product_id}`);
      }

      balances.push({
        amount: fromX18(perpBalance.amount_x18),
        vQuoteBalance: fromX18(perpBalance.v_quote_balance_x18),
        health: {
          initial: toBigDecimal(perpBalance.initial_x18),
          maintenance: toBigDecimal(perpBalance.maintenance_x18),
          unweighted: toBigDecimal(perpBalance.pnl_x18),
        },
        productId: product.product_id,
        ...mapEngineServerPerpProduct(product).product,
      });
    });

    return {
      balances: balances,
      health: {
        initial: toBigDecimal(baseResponse.initial_health_x18),
        maintenance: toBigDecimal(baseResponse.maintenance_health_x18),
        unweighted: toBigDecimal(baseResponse.pnl_health_x18),
      },
    };
  }

  /**
   * Retrieves all market states as per the offchain engine. Same return interface as contracts
   */
  async getAllMarkets(): Promise<GetEngineAllMarketsResponse> {
    const markets: MarketWithProduct[] = [];

    const baseResponse = await this.query('all_products', {});
    baseResponse.spot_products.forEach((spotProduct) => {
      markets.push(mapEngineServerSpotProduct(spotProduct));
    });
    baseResponse.perp_products.forEach((perpProduct) => {
      markets.push(mapEngineServerPerpProduct(perpProduct));
    });

    return markets;
  }

  /**
   * Retrieves an order from the offchain engine
   *
   * @param params
   */
  async getOrder(
    params: GetEngineOrderParams,
  ): Promise<GetEngineOrderResponse> {
    const baseResponse = await this.query('order', {
      digest: params.digest,
      product_id: params.productId,
    });

    return mapEngineServerOrder(baseResponse);
  }

  /**
   * Signs and validates with the engine that the order is valid to be submitted (i.e. does not violate health reqs)
   *
   * @param params
   */
  async validateOrderParams(
    params: ValidateEngineOrderParams,
  ): Promise<ValidateEngineOrderResponse> {
    const signedOrder = {
      order: params.order,
      signature: await this.sign(
        'place_order',
        params.orderbookAddr,
        params.order,
      ),
    };
    return this.validateSignedOrderParams({
      signedOrder,
      productId: params.productId,
    });
  }

  /**
   * Validates an existing signed order with the engine as a pre-check for health
   *
   * @param params
   */
  async validateSignedOrderParams(
    params: ValidateSignedEngineOrderParams,
  ): Promise<ValidateEngineOrderResponse> {
    const baseResponse = await this.query('validate_order', {
      product_id: params.productId,
      order: encodeSignedOrder(params.signedOrder),
    });

    return {
      productId: baseResponse.product_id,
      valid: baseResponse.valid,
    };
  }

  /**
   * Get all subaccount orders from the engine, per product ID
   * @param params
   */
  async getSubaccountOrders(
    params: GetEngineSubaccountOrdersParams,
  ): Promise<GetEngineSubaccountOrdersResponse> {
    const baseResponse = await this.query('subaccount_orders', {
      product_id: params.productId,
      sender: params.sender,
      subaccount_name: params.subaccountName,
    });

    return {
      orders: baseResponse.orders.map(mapEngineServerOrder),
      productId: params.productId,
      sender: baseResponse.sender,
      subaccountName: baseResponse.subaccount_name,
    };
  }

  /**
   * Gets "price ticks" for a given market, useful for constructing liquidity levels at each price
   * @param params
   */
  async getMarketLiquidity(
    params: GetEngineMarketLiquidityParams,
  ): Promise<GetEngineMarketLiquidityResponse> {
    const baseResponse = await this.query('market_liquidity', {
      product_id: params.productId,
      depth: params.depth,
    });
    return {
      asks: baseResponse.asks.map(mapEngineServerTickLiquidity),
      bids: baseResponse.bids.map(mapEngineServerTickLiquidity),
    };
  }

  /**
   * Retrieves the latest price for a given market
   * @param params
   */
  async getMarketPrice(
    params: GetEngineMarketPriceParams,
  ): Promise<GetEngineMarketPriceResponse> {
    const baseResponse = await this.query('market_price', {
      product_id: params.productId,
    });
    return {
      ask: fromX18(baseResponse.ask_x18),
      bid: fromX18(baseResponse.bid_x18),
      productId: baseResponse.product_id,
    };
  }
}
