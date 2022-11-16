import {
  EngineOrder,
  EnginePriceTickLiquidity,
  EngineServerGetOrderResponse,
  EngineServerPerpProduct,
  EngineServerPriceTickLiquidity,
  EngineServerSpotProduct,
} from './types';
import { fromX18, toBigDecimal, toEthersBN } from '@vertex-protocol/utils';
import {
  calcTotalBorrowed,
  calcTotalDeposited,
  PerpMarket,
  ProductEngineType,
  SpotMarket,
} from '@vertex-protocol/contracts';

export function mapEngineServerTickLiquidity(
  tick: EngineServerPriceTickLiquidity,
): EnginePriceTickLiquidity {
  return {
    price: fromX18(tick[0]),
    liquidity: toBigDecimal(tick[1]),
  };
}

export function mapEngineServerOrder(
  order: EngineServerGetOrderResponse,
): EngineOrder {
  return {
    digest: order.digest,
    expiration: toBigDecimal(order.expiration),
    nonce: toBigDecimal(order.nonce),
    price: fromX18(order.price_x18),
    productId: order.product_id,
    sender: order.sender,
    subaccountName: order.subaccount_name,
    totalAmount: toBigDecimal(order.amount),
    unfilledAmount: toBigDecimal(order.unfilled_amount),
    // Standardizes from hex
    // toFixed is required as toString gives values with `e`
    orderParams: {
      amount: toBigDecimal(order.amount).toFixed(),
      expiration: toBigDecimal(order.expiration).toFixed(),
      nonce: toBigDecimal(order.nonce).toFixed(),
      price: fromX18(order.price_x18).toFixed(),
      sender: order.sender,
      subaccountName: order.subaccount_name,
    },
    placementTime: order.placed_at,
  };
}

export function mapEngineServerSpotProduct(
  product: EngineServerSpotProduct,
): SpotMarket {
  return {
    type: ProductEngineType.SPOT,
    productId: product.product_id,
    priceIncrement: fromX18(product.book_info.price_increment_x18),
    sizeIncrement: toBigDecimal(product.book_info.size_increment),
    product: {
      productId: product.product_id,
      type: ProductEngineType.SPOT,
      totalBorrowed: calcTotalBorrowed(
        toEthersBN(product.state.total_borrows_normalized_x18),
        toEthersBN(product.state.cumulative_borrows_multiplier_x18),
      ),
      totalDeposited: calcTotalDeposited(
        toEthersBN(product.state.total_deposits_normalized_x18),
        toEthersBN(product.state.cumulative_deposits_multiplier_x18),
      ),
      oraclePrice: fromX18(product.oracle_price_x18),
      interestFloor: fromX18(product.config.interest_floor_x18),
      interestInflectionUtil: fromX18(
        product.config.interest_inflection_util_x18,
      ),
      interestLargeCap: fromX18(product.config.interest_large_cap_x18),
      interestSmallCap: fromX18(product.config.interest_small_cap_x18),
      largePositionPenalty: fromX18(product.risk.large_position_penalty_x18),
      longWeightInitial: fromX18(product.risk.long_weight_initial_x18),
      longWeightMaintenance: fromX18(product.risk.long_weight_maintenance_x18),
      shortWeightInitial: fromX18(product.risk.short_weight_initial_x18),
      shortWeightMaintenance: fromX18(
        product.risk.short_weight_maintenance_x18,
      ),
      tokenAddr: product.config.token,
      totalLpBaseAmount: fromX18(product.lp_state.base.amount_x18),
      totalLpQuoteAmount: fromX18(product.lp_state.quote.amount_x18),
      totalLpSupply: toBigDecimal(product.lp_state.supply),
    },
  };
}

export function mapEngineServerPerpProduct(
  product: EngineServerPerpProduct,
): PerpMarket {
  return {
    type: ProductEngineType.PERP,
    productId: product.product_id,
    priceIncrement: fromX18(product.book_info.price_increment_x18),
    sizeIncrement: fromX18(product.book_info.size_increment),
    product: {
      productId: product.product_id,
      type: ProductEngineType.PERP,
      markPrice: fromX18(product.mark_price_x18),
      oraclePrice: fromX18(product.oracle_price_x18),
      largePositionPenalty: fromX18(product.risk.large_position_penalty_x18),
      longWeightInitial: fromX18(product.risk.long_weight_initial_x18),
      longWeightMaintenance: fromX18(product.risk.long_weight_maintenance_x18),
      shortWeightInitial: fromX18(product.risk.short_weight_initial_x18),
      shortWeightMaintenance: fromX18(
        product.risk.short_weight_maintenance_x18,
      ),
      openInterest: fromX18(product.state.open_interest_x18),
      totalLpBaseAmount: toBigDecimal(product.lp_state.base),
      totalLpQuoteAmount: toBigDecimal(product.lp_state.quote),
      totalLpSupply: toBigDecimal(product.lp_state.supply),
    },
  };
}
