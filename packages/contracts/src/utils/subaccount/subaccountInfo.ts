import { SubaccountSummaryResponse } from '../../query';
import { ProductEngineType } from '../../common';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import {
  calcPerpBalanceNotionalValue,
  calcPerpBalanceValue,
  calcSpotBalanceValue,
} from '../balanceValue';

export interface TotalPortfolioValues {
  // Sum of spot and perpNotional
  totalNotional: BigDecimal;
  // Sum of spot and perp
  netTotal: BigDecimal;
  // Net spot value
  spot: BigDecimal;
  // This is the notional value of the position
  perpNotional: BigDecimal;
  // Indicates the value of the perp position, which is notional value of the position minus the entry cost and funding.
  // This is the same as PnL
  perp: BigDecimal;
}

/**
 * Return total portfolio values in terms of quote
 *
 * @param summary
 * @param productDecimalsByProductId Token decimals by product ID, if given for a product, will divide the
 *  absolute amount by the decimals given, defaults to 0
 */
export function calcTotalPortfolioValues(
  summary: SubaccountSummaryResponse,
  productDecimalsByProductId: Record<number, number> = {},
): TotalPortfolioValues {
  const values: TotalPortfolioValues = {
    netTotal: toBigDecimal(0),
    perp: toBigDecimal(0),
    perpNotional: toBigDecimal(0),
    spot: toBigDecimal(0),
    totalNotional: toBigDecimal(0),
  };

  summary.balances.forEach((balance) => {
    const decimals = productDecimalsByProductId[balance.productId] ?? 0;
    if (balance.type === ProductEngineType.SPOT) {
      const value = calcSpotBalanceValue(balance, decimals);

      values.totalNotional = values.totalNotional.plus(value);
      values.netTotal = values.netTotal.plus(value);
      values.spot = values.spot.plus(value);
    } else if (balance.type === ProductEngineType.PERP) {
      const notional = calcPerpBalanceNotionalValue(balance, decimals);
      const value = calcPerpBalanceValue(balance, decimals);

      values.totalNotional = values.totalNotional.plus(notional);
      values.perpNotional = values.perpNotional.plus(notional);
      values.netTotal = values.netTotal.plus(value);
      values.perp = values.perp.plus(value);
    }
  });

  return values;
}

/**
 * Leverage calculated as totalNotional / netTotal
 *
 * @param summary
 * @param productDecimalsByProductId
 */
export function calcSubaccountLeverage(
  summary: SubaccountSummaryResponse,
  productDecimalsByProductId: Record<number, number> = {},
) {
  const { totalNotional, netTotal } = calcTotalPortfolioValues(
    summary,
    productDecimalsByProductId,
  );
  if (netTotal.eq(0)) {
    return toBigDecimal(0);
  }
  return totalNotional.dividedBy(netTotal);
}

export interface MarginUsageFractions {
  maintenance: BigDecimal;
  initial: BigDecimal;
}

/**
 * Calculate margin usage fractions. Which is = sum(negative health).abs() / sum(positive health)
 * Health is either maintenance / initial.
 *
 * @param summary
 */
export function calcMarginUsageFractions(
  summary: SubaccountSummaryResponse,
): MarginUsageFractions {
  const initialMarginUsage = summary.health.initial.assets.eq(0)
    ? toBigDecimal(0)
    : summary.health.initial.liabilities
        .abs()
        .div(summary.health.initial.assets);
  const maintenanceMarginUsage = summary.health.maintenance.assets.eq(0)
    ? toBigDecimal(0)
    : summary.health.maintenance.liabilities
        .abs()
        .div(summary.health.maintenance.assets);

  return {
    initial: initialMarginUsage,
    maintenance: maintenanceMarginUsage,
  };
}
