import { SubaccountSummaryResponse } from '../query';
import { ProductEngineType } from '../common';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import {
  calcLpBalanceValue,
  calcPerpBalanceNotionalValue,
  calcPerpBalanceValue,
  calcSpotBalanceValue,
} from './balanceValue';

export interface TotalPortfolioValues {
  // spot + spotLp + perpNotional + perpLp
  totalNotional: BigDecimal;
  // spot + spotLp + perp + perpLp
  netTotal: BigDecimal;
  // Net spot value
  spot: BigDecimal;
  // Spot LP value
  spotLp: BigDecimal;
  // This is the notional value of the position
  perpNotional: BigDecimal;
  // Perp LP value
  perpLp: BigDecimal;
  // Indicates the value of the perp position, which is notional value of the position minus the entry cost and funding.
  // This is the same as PnL
  perp: BigDecimal;
}

/**
 * Return total portfolio values in terms of quote
 *
 * @param summary
 */
export function calcTotalPortfolioValues(
  summary: SubaccountSummaryResponse,
): TotalPortfolioValues {
  const values: TotalPortfolioValues = {
    netTotal: toBigDecimal(0),
    spot: toBigDecimal(0),
    spotLp: toBigDecimal(0),
    perp: toBigDecimal(0),
    perpNotional: toBigDecimal(0),
    perpLp: toBigDecimal(0),
    totalNotional: toBigDecimal(0),
  };

  summary.balances.forEach((balance) => {
    if (balance.type === ProductEngineType.SPOT) {
      const value = calcSpotBalanceValue(balance);

      values.spot = values.spot.plus(value);
      values.spotLp = values.spotLp.plus(calcLpBalanceValue(balance));
    } else if (balance.type === ProductEngineType.PERP) {
      const notional = calcPerpBalanceNotionalValue(balance);
      const value = calcPerpBalanceValue(balance);

      values.perpNotional = values.perpNotional.plus(notional);
      values.perp = values.perp.plus(value);
      values.perpLp = values.perpLp.plus(calcLpBalanceValue(balance));
    }
  });

  values.netTotal = values.spot
    .plus(values.spotLp)
    .plus(values.perp)
    .plus(values.perpLp);
  values.totalNotional = values.spot
    .plus(values.spotLp)
    .plus(values.perpNotional)
    .plus(values.perpLp);

  return values;
}

/**
 * Leverage calculated as totalNotional / netTotal
 *
 * @param summary
 */
export function calcSubaccountLeverage(summary: SubaccountSummaryResponse) {
  const { totalNotional, netTotal } = calcTotalPortfolioValues(summary);
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
