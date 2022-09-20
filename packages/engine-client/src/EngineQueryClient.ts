import { EngineBaseClient } from './EngineBaseClient';
import {
  calcTotalBorrowed,
  calcTotalDeposited,
  encodeSignedOrder,
  MarketWithProduct,
  PerpMarket,
  ProductEngineType,
  SpotMarket,
} from '@vertex-protocol/contracts';
import { BigNumber } from 'ethers';
import { fromX18, toBigDecimal, toEthersBN } from '@vertex-protocol/utils';
import {
  EngineOrder,
  EnginePriceTickLiquidity,
  EngineServerGetOrderResponse,
  EngineServerPerpProduct,
  EngineServerPriceTickLiquidity,
  EngineServerSpotProduct,
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

export class EngineQueryClient extends EngineBaseClient {
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

  async getOrder(
    params: GetEngineOrderParams,
  ): Promise<GetEngineOrderResponse> {
    const baseResponse = await this.query('order', {
      digest: params.digest,
      product_id: params.productId,
    });

    return mapEngineServerOrder(baseResponse);
  }

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

  async getSubaccountOrders(
    params: GetEngineSubaccountOrdersParams,
  ): Promise<GetEngineSubaccountOrdersResponse> {
    const baseResponse = await this.query('subaccount_orders', {
      product_id: params.productId,
      subaccount_id: BigNumber.from(params.subaccountId).toNumber(),
    });

    return {
      orders: baseResponse.orders.map(mapEngineServerOrder),
      productId: params.productId,
      subaccountId: BigNumber.from(baseResponse.subaccount_id).toNumber(),
    };
  }

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

function mapEngineServerTickLiquidity(
  tick: EngineServerPriceTickLiquidity,
): EnginePriceTickLiquidity {
  return {
    price: fromX18(tick[0]),
    liquidity: toBigDecimal(tick[1]),
  };
}

function mapEngineServerOrder(
  order: EngineServerGetOrderResponse,
): EngineOrder {
  return {
    digest: order.digest,
    expiration: toBigDecimal(order.expiration),
    nonce: toBigDecimal(order.nonce),
    price: fromX18(order.price_x18),
    productId: order.product_id,
    subaccountId: toBigDecimal(order.subaccount).toNumber(),
    totalAmount: toBigDecimal(order.amount),
    unfilledAmount: toBigDecimal(order.unfilled_amount),
    // Standardizes from hex
    orderParams: {
      amount: toBigDecimal(order.amount).toString(),
      expiration: toBigDecimal(order.expiration).toString(),
      nonce: toBigDecimal(order.nonce).toString(),
      price: fromX18(order.price_x18).toString(),
      subaccountId: order.subaccount,
    },
  };
}

function mapEngineServerSpotProduct(
  product: EngineServerSpotProduct,
): SpotMarket {
  return {
    type: ProductEngineType.SPOT,
    productId: product.product_id,
    markPrice: toBigDecimal(product.book_info.mark_price_x18),
    priceIncrement: toBigDecimal(product.book_info.price_increment_x18),
    sizeIncrement: toBigDecimal(product.book_info.size_increment_x18),
    product: {
      type: ProductEngineType.SPOT,
      totalBorrowed: calcTotalBorrowed(
        toEthersBN(product.total_borrows_normalized_x18),
        toEthersBN(product.cumulative_borrows_multiplier_x18),
      ),
      totalDeposited: calcTotalDeposited(
        toEthersBN(product.total_deposits_normalized_x18),
        toEthersBN(product.cumulative_deposits_multiplier_x18),
      ),
      oraclePrice: fromX18(product.oracle_price_x18),
      interestFloor: toBigDecimal(product.config.interest_floor_x18),
      interestInflectionUtil: toBigDecimal(
        product.config.interest_inflection_util_x18,
      ),
      interestLargeCap: toBigDecimal(product.config.interest_large_cap_x18),
      interestSmallCap: toBigDecimal(product.config.interest_small_cap_x18),
      largePositionPenalty: toBigDecimal(
        product.config.large_position_penalty_x18,
      ),
      longWeightInitial: toBigDecimal(product.config.long_weight_initial_x18),
      longWeightMaintenance: toBigDecimal(
        product.config.long_weight_maintenance_x18,
      ),
      shortWeightInitial: toBigDecimal(product.config.short_weight_initial_x18),
      shortWeightMaintenance: toBigDecimal(
        product.config.short_weight_maintenance_x18,
      ),
      tokenAddr: product.config.token,
    },
  };
}

function mapEngineServerPerpProduct(
  product: EngineServerPerpProduct,
): PerpMarket {
  return {
    type: ProductEngineType.PERP,
    productId: product.product_id,
    markPrice: toBigDecimal(product.book_info.mark_price_x18),
    priceIncrement: toBigDecimal(product.book_info.price_increment_x18),
    sizeIncrement: toBigDecimal(product.book_info.size_increment_x18),
    product: {
      type: ProductEngineType.PERP,
      emaPrice: fromX18(product.ema_price_x18),
      oraclePrice: fromX18(product.oracle_price_x18),
      largePositionPenalty: toBigDecimal(
        product.config.large_position_penalty_x18,
      ),
      longWeightInitial: toBigDecimal(product.config.long_weight_initial_x18),
      longWeightMaintenance: toBigDecimal(
        product.config.long_weight_maintenance_x18,
      ),
      shortWeightInitial: toBigDecimal(product.config.short_weight_initial_x18),
      shortWeightMaintenance: toBigDecimal(
        product.config.short_weight_maintenance_x18,
      ),
    },
  };
}
