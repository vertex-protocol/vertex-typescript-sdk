import { EngineBaseClient } from './EngineBaseClient';
import {
  encodeSignedOrder,
  MarketWithProduct,
} from '@vertex-protocol/contracts';
import { BigNumber } from 'ethers';
import { fromX18, toBigDecimal, toX18 } from '@vertex-protocol/utils';
import {
  EngineServerStatusResponse,
  EngineServerSubaccountInfoQueryParams,
  EngineServerSubaccountInfoResponse,
  GetEngineAllMarketsResponse,
  GetEngineEstimatedSubaccountSummaryParams,
  GetEngineMarketLiquidityParams,
  GetEngineMarketLiquidityResponse,
  GetEngineMarketPriceParams,
  GetEngineMarketPriceResponse,
  GetEngineMaxOrderSizeParams,
  GetEngineMaxOrderSizeResponse,
  GetEngineMaxWithdrawableParams,
  GetEngineMaxWithdrawableResponse,
  GetEngineOrderParams,
  GetEngineOrderResponse,
  GetEngineSubaccountFeeRatesParams,
  GetEngineSubaccountFeeRatesResponse,
  GetEngineSubaccountIdParams,
  GetEngineSubaccountIdResponse,
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
   * Retrieves current engine status
   */
  async getStatus(): Promise<EngineServerStatusResponse> {
    return this.query('status', {});
  }

  /**
   * Retrieves the subaccount ID reflective of the offchain engine
   * @param params
   */
  async getSubaccountId(
    params: GetEngineSubaccountIdParams,
  ): Promise<GetEngineSubaccountIdResponse> {
    const baseResponse = await this.query('subaccount_id', {
      address: params.address,
      subaccount_name: params.subaccountName,
    });

    return baseResponse.subaccount_id;
  }

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

    return mapSubaccountSummary(baseResponse);
  }

  /**
   * Retrieves an estimated subaccount summary with the applied transactions
   *
   * @param params
   */
  async getEstimatedSubaccountSummary(
    params: GetEngineEstimatedSubaccountSummaryParams,
  ): Promise<GetEngineSubaccountSummaryResponse> {
    const subaccountId = BigNumber.from(params.subaccountId).toNumber();
    const queryParams: EngineServerSubaccountInfoQueryParams = {
      subaccount_id: subaccountId,
      txns: params.txs.map(
        (
          tx,
        ): NonNullable<
          EngineServerSubaccountInfoQueryParams['txns']
        >[number] => {
          switch (tx.type) {
            case 'burn_lp':
              return {
                burn_lp: {
                  product_id: tx.tx.productId,
                  subaccount_id: subaccountId,
                  amount_lp_x18: toX18(tx.tx.amountLp).toString(),
                },
              };
            case 'apply_delta':
              return {
                apply_delta: {
                  product_id: tx.tx.productId,
                  subaccount_id: subaccountId,
                  amount_delta_x18: toX18(tx.tx.amountDelta).toString(),
                  v_quote_delta_x18: toX18(tx.tx.vQuoteDelta).toString(),
                },
              };
            case 'mint_lp':
              return {
                mint_lp: {
                  product_id: tx.tx.productId,
                  subaccount_id: subaccountId,
                  amount_base_x18: toX18(tx.tx.amountBase).toString(),
                  quote_amount_low_x18: toX18(tx.tx.amountQuoteLow).toString(),
                  quote_amount_high_x18: toX18(
                    tx.tx.amountQuoteHigh,
                  ).toString(),
                },
              };
          }
        },
      ),
    };
    const baseResponse = await this.query('subaccount_info', {
      subaccount_id: queryParams.subaccount_id,
      txns: JSON.stringify(queryParams.txns),
    });

    return mapSubaccountSummary(baseResponse);
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
   * Gets maker & taker fee rates for order fees
   * @params params
   */
  async getSubaccountFeeRates(
    params: GetEngineSubaccountFeeRatesParams,
  ): Promise<GetEngineSubaccountFeeRatesResponse> {
    const baseResponse = await this.query('subaccount_fee_rates', {
      product_id: params.productId,
      sender: params.sender,
      subaccount_name: params.subaccountName,
    });

    return {
      makerRate: fromX18(baseResponse.maker_fee_rate_x18),
      takerRate: fromX18(baseResponse.taker_fee_rate_x18),
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

  /**
   * Retrieves the estimated max order size for a product
   * @param params
   */
  async getMaxOrderSize(
    params: GetEngineMaxOrderSizeParams,
  ): Promise<GetEngineMaxOrderSizeResponse> {
    const baseResponse = await this.query('max_order_size', {
      direction: params.side,
      price_x18: toX18(params.price.toFixed(0)).toString(),
      product_id: params.productId,
      sender: params.sender,
      subaccount_name: params.subaccountName,
    });

    return toBigDecimal(baseResponse.max_order_size);
  }

  /**
   * Retrieves the estimated max withdrawal size for a product
   * @param params
   */
  async getMaxWithdrawable(
    params: GetEngineMaxWithdrawableParams,
  ): Promise<GetEngineMaxWithdrawableResponse> {
    const baseResponse = await this.query('max_withdrawable', {
      product_id: params.productId,
      sender: params.sender,
      subaccount_name: params.subaccountName,
    });

    return toBigDecimal(baseResponse.max_withdrawable);
  }
}

function mapSubaccountSummary(
  baseResponse: EngineServerSubaccountInfoResponse,
): GetEngineSubaccountSummaryResponse {
  const balances: GetEngineSubaccountSummaryResponse['balances'] = [];

  baseResponse.spot_balances.forEach((spotBalance) => {
    const product = baseResponse.spot_products.find(
      (product) => product.product_id === spotBalance.product_id,
    );
    if (!product) {
      throw Error(`Could not find product ${spotBalance.product_id}`);
    }

    balances.push({
      amount: fromX18(spotBalance.balance.amount_x18),
      lpAmount: fromX18(spotBalance.lp_balance.amount_x18),
      ...mapEngineServerSpotProduct(product).product,
    });
  });

  baseResponse.perp_balances.forEach((perpBalance) => {
    const product = baseResponse.perp_products.find(
      (product) => product.product_id === perpBalance.product_id,
    );
    if (!product) {
      throw Error(`Could not find product ${perpBalance.product_id}`);
    }

    balances.push({
      amount: fromX18(perpBalance.balance.amount_x18),
      lpAmount: fromX18(perpBalance.lp_balance.amount_x18),
      vQuoteBalance: fromX18(perpBalance.balance.v_quote_balance_x18),
      ...mapEngineServerPerpProduct(product).product,
    });
  });

  return {
    balances: balances,
    health: {
      initial: {
        health: fromX18(baseResponse.healths[0].health_x18),
        assets: fromX18(baseResponse.healths[0].assets_x18),
        liabilities: fromX18(baseResponse.healths[0].liabilities_x18),
      },
      maintenance: {
        health: fromX18(baseResponse.healths[1].health_x18),
        assets: fromX18(baseResponse.healths[1].assets_x18),
        liabilities: fromX18(baseResponse.healths[1].liabilities_x18),
      },
      unweighted: {
        health: fromX18(baseResponse.healths[2].health_x18),
        assets: fromX18(baseResponse.healths[2].assets_x18),
        liabilities: fromX18(baseResponse.healths[2].liabilities_x18),
      },
    },
  };
}
