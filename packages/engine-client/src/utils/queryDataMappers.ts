import {
  BalanceHealthContributions,
  calcTotalBorrowed,
  calcTotalDeposited,
  OrderExpirationType,
  PerpMarket,
  ProductEngineType,
  SpotMarket,
  subaccountFromHex,
} from '@vertex-protocol/contracts';
import { fromX18, mapValues, toBigDecimal } from '@vertex-protocol/utils';
import {
  EngineMarketPrice,
  EngineOrder,
  EnginePriceTickLiquidity,
  EngineServerIsolatedPositionsResponse,
  EngineServerMarketPrice,
  EngineServerOrderResponse,
  EngineServerPerpProduct,
  EngineServerPriceTickLiquidity,
  EngineServerSpotProduct,
  EngineServerSubaccountInfoResponse,
  EngineServerSymbol,
  EngineServerSymbolsResponse,
  EngineSymbol,
  EngineSymbolsResponse,
  GetEngineIsolatedPositionsResponse,
  GetEngineSubaccountSummaryResponse,
} from '../types';
import { mapEngineServerProductType } from './productEngineTypeMappers';

export function mapEngineServerTickLiquidity(
  tick: EngineServerPriceTickLiquidity,
): EnginePriceTickLiquidity {
  return {
    price: fromX18(tick[0]),
    liquidity: toBigDecimal(tick[1]),
  };
}

export function mapEngineServerOrder(
  order: EngineServerOrderResponse,
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
    margin: order.margin ? toBigDecimal(order.margin) : null,
    // Standardizes from hex
    // toFixed is required as toString gives values with `e`
    orderParams: {
      amount: toBigDecimal(order.amount).toFixed(0),
      expiration: toBigDecimal(order.expiration).toFixed(0),
      nonce: order.nonce,
      price: fromX18(order.price_x18).toFixed(0),
      subaccountOwner: subaccount.subaccountOwner,
      subaccountName: subaccount.subaccountName,
    },
    placementTime: order.placed_at,
    orderType: order.order_type as OrderExpirationType,
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
      cumulativeFundingLong: fromX18(product.state.cumulative_funding_long_x18),
      cumulativeFundingShort: fromX18(
        product.state.cumulative_funding_short_x18,
      ),
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
    exists: baseResponse.exists,
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

export function mapEngineServerIsolatedPositions(
  baseResponse: EngineServerIsolatedPositionsResponse,
): GetEngineIsolatedPositionsResponse {
  return baseResponse.isolated_positions.map((position) => {
    const perpBalance = position.base_balance;
    const quoteBalance = position.quote_balance;

    return {
      subaccount: subaccountFromHex(position.subaccount),
      baseBalance: {
        amount: toBigDecimal(perpBalance.balance.amount),
        lpAmount: toBigDecimal(perpBalance.lp_balance.amount),
        vQuoteBalance: toBigDecimal(perpBalance.balance.v_quote_balance),
        // Health contributions === healths for an isolated position
        healthContributions: {
          initial: toBigDecimal(position.base_healths[0].health),
          maintenance: toBigDecimal(position.base_healths[1].health),
          unweighted: toBigDecimal(position.base_healths[2].health),
        },
        ...mapEngineServerPerpProduct(position.base_product).product,
      },
      quoteBalance: {
        amount: toBigDecimal(quoteBalance.balance.amount),
        lpAmount: toBigDecimal(quoteBalance.lp_balance.amount),
        healthContributions: {
          initial: toBigDecimal(position.quote_healths[0].health),
          maintenance: toBigDecimal(position.quote_healths[1].health),
          unweighted: toBigDecimal(position.quote_healths[2].health),
        },
        ...mapEngineServerSpotProduct(position.quote_product).product,
      },
    };
  });
}

export function mapEngineServerSymbols(
  baseResponse: EngineServerSymbolsResponse,
): EngineSymbolsResponse {
  const symbols: Record<string, EngineSymbol> = mapValues(
    baseResponse.symbols,
    mapEngineServerSymbol,
  );

  return {
    symbols,
  };
}

export function mapEngineServerSymbol(
  engineServerSymbol: EngineServerSymbol,
): EngineSymbol {
  return {
    type: mapEngineServerProductType(engineServerSymbol.type),
    productId: engineServerSymbol.product_id,
    symbol: engineServerSymbol.symbol,
    priceIncrement: fromX18(engineServerSymbol.price_increment_x18),
    sizeIncrement: toBigDecimal(engineServerSymbol.size_increment),
    minSize: toBigDecimal(engineServerSymbol.min_size),
    minDepth: fromX18(engineServerSymbol.min_depth_x18),
    maxSpreadRate: fromX18(engineServerSymbol.max_spread_rate_x18),
    makerFeeRate: fromX18(engineServerSymbol.maker_fee_rate_x18),
    takerFeeRate: fromX18(engineServerSymbol.taker_fee_rate_x18),
    longWeightInitial: fromX18(engineServerSymbol.long_weight_initial_x18),
    longWeightMaintenance: fromX18(
      engineServerSymbol.long_weight_maintenance_x18,
    ),
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
