import {
  EngineMarketPrice,
  EngineOrder,
  EnginePriceTickLiquidity,
  EngineServerGetOrderResponse,
  EngineServerMarketPrice,
  EngineServerPerpProduct,
  EngineServerPriceTickLiquidity,
  EngineServerSpotProduct,
  EngineServerSubaccountInfoResponse,
  GetEngineSubaccountSummaryResponse,
} from '../types';
import { fromX18, toBigDecimal } from '@vertex-protocol/utils';
import {
  BalanceHealthContributions,
  calcTotalBorrowed,
  calcTotalDeposited,
  PerpMarket,
  ProductEngineType,
  SpotMarket,
  subaccountFromHex,
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
  const subaccount = subaccountFromHex(order.sender);
  return {
    digest: order.digest,
    expiration: toBigDecimal(order.expiration),
    nonce: order.nonce,
    price: fromX18(order.price_x18),
    productId: order.product_id,
    subaccountOwner: subaccount.subaccountOwner,
    subaccountName: subaccount.subaccountName,
    totalAmount: toBigDecimal(order.amount),
    unfilledAmount: toBigDecimal(order.unfilled_amount),
    // Standardizes from hex
    // toFixed is required as toString gives values with `e`
    orderParams: {
      amount: toBigDecimal(order.amount).toFixed(),
      expiration: toBigDecimal(order.expiration).toFixed(),
      nonce: order.nonce,
      price: fromX18(order.price_x18).toFixed(),
      subaccountOwner: subaccount.subaccountOwner,
      subaccountName: subaccount.subaccountName,
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
    minSize: toBigDecimal(product.book_info.min_size),
    priceIncrement: fromX18(product.book_info.price_increment_x18),
    sizeIncrement: toBigDecimal(product.book_info.size_increment),
    product: {
      productId: product.product_id,
      type: ProductEngineType.SPOT,
      totalBorrowed: calcTotalBorrowed(
        product.state.total_borrows_normalized,
        product.state.cumulative_borrows_multiplier_x18,
      ),
      totalDeposited: calcTotalDeposited(
        product.state.total_deposits_normalized,
        product.state.cumulative_deposits_multiplier_x18,
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
      totalLpBaseAmount: toBigDecimal(product.lp_state.base.amount),
      totalLpQuoteAmount: toBigDecimal(product.lp_state.quote.amount),
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
    minSize: toBigDecimal(product.book_info.min_size),
    priceIncrement: fromX18(product.book_info.price_increment_x18),
    sizeIncrement: toBigDecimal(product.book_info.size_increment),
    product: {
      productId: product.product_id,
      type: ProductEngineType.PERP,
      oraclePrice: fromX18(product.oracle_price_x18),
      largePositionPenalty: fromX18(product.risk.large_position_penalty_x18),
      longWeightInitial: fromX18(product.risk.long_weight_initial_x18),
      longWeightMaintenance: fromX18(product.risk.long_weight_maintenance_x18),
      shortWeightInitial: fromX18(product.risk.short_weight_initial_x18),
      shortWeightMaintenance: fromX18(
        product.risk.short_weight_maintenance_x18,
      ),
      openInterest: toBigDecimal(product.state.open_interest),
      totalLpBaseAmount: toBigDecimal(product.lp_state.base),
      totalLpQuoteAmount: toBigDecimal(product.lp_state.quote),
      totalLpSupply: toBigDecimal(product.lp_state.supply),
    },
  };
}

export function mapEngineServerBalanceHealthContributions(
  healthContributionsForBalance: string[],
): BalanceHealthContributions {
  return {
    initial: toBigDecimal(healthContributionsForBalance[0]),
    maintenance: toBigDecimal(healthContributionsForBalance[1]),
    unweighted: toBigDecimal(healthContributionsForBalance[2]),
  };
}

export function mapSubaccountSummary(
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
      amount: toBigDecimal(spotBalance.balance.amount),
      lpAmount: toBigDecimal(spotBalance.lp_balance.amount),
      healthContributions: mapEngineServerBalanceHealthContributions(
        baseResponse.health_contributions[spotBalance.product_id],
      ),
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
      amount: toBigDecimal(perpBalance.balance.amount),
      lpAmount: toBigDecimal(perpBalance.lp_balance.amount),
      vQuoteBalance: toBigDecimal(perpBalance.balance.v_quote_balance),
      healthContributions: mapEngineServerBalanceHealthContributions(
        baseResponse.health_contributions[perpBalance.product_id],
      ),
      ...mapEngineServerPerpProduct(product).product,
    });
  });

  return {
    balances: balances,
    health: {
      initial: {
        health: toBigDecimal(baseResponse.healths[0].health),
        assets: toBigDecimal(baseResponse.healths[0].assets),
        liabilities: toBigDecimal(baseResponse.healths[0].liabilities),
      },
      maintenance: {
        health: toBigDecimal(baseResponse.healths[1].health),
        assets: toBigDecimal(baseResponse.healths[1].assets),
        liabilities: toBigDecimal(baseResponse.healths[1].liabilities),
      },
      unweighted: {
        health: toBigDecimal(baseResponse.healths[2].health),
        assets: toBigDecimal(baseResponse.healths[2].assets),
        liabilities: toBigDecimal(baseResponse.healths[2].liabilities),
      },
    },
  };
}

export function mapEngineMarketPrice(
  baseResponse: EngineServerMarketPrice,
): EngineMarketPrice {
  return {
    ask: fromX18(baseResponse.ask_x18),
    bid: fromX18(baseResponse.bid_x18),
    productId: baseResponse.product_id,
  };
}
