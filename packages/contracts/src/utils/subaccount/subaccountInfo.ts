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
 */
export function calcTotalPortfolioValues(
  summary: SubaccountSummaryResponse,
): TotalPortfolioValues {
  const values: TotalPortfolioValues = {
    netTotal: toBigDecimal(0),
    perp: toBigDecimal(0),
    perpNotional: toBigDecimal(0),
    spot: toBigDecimal(0),
    totalNotional: toBigDecimal(0),
  };

  summary.balances.forEach((balance) => {
    if (balance.type === ProductEngineType.SPOT) {
      const value = calcSpotBalanceValue(balance);

      values.totalNotional = values.totalNotional.plus(value);
      values.netTotal = values.netTotal.plus(value);
      values.spot = values.spot.plus(value);
    } else if (balance.type === ProductEngineType.PERP) {
      const notional = calcPerpBalanceNotionalValue(balance);
      const value = calcPerpBalanceValue(balance);

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
  const positiveHealths = {
    maintenance: toBigDecimal(0),
    initial: toBigDecimal(0),
  };
  const absNegativeHealths = {
    maintenance: toBigDecimal(0),
    initial: toBigDecimal(0),
  };

  summary.balances.forEach((balance) => {
    // Initial & maintenance should have same signs
    if (balance.health.initial.gt(0)) {
      positiveHealths.initial = positiveHealths.initial.plus(
        balance.health.initial,
      );
      positiveHealths.maintenance = positiveHealths.maintenance.plus(
        balance.health.maintenance,
      );
    } else {
      absNegativeHealths.initial = absNegativeHealths.initial.plus(
        balance.health.initial.abs(),
      );
      absNegativeHealths.maintenance = absNegativeHealths.maintenance.plus(
        balance.health.maintenance.abs(),
      );
    }
  });

  const initialMarginUsage = positiveHealths.initial.eq(0)
    ? toBigDecimal(0)
    : absNegativeHealths.initial.div(positiveHealths.initial);
  const maintenanceMarginUsage = positiveHealths.maintenance.eq(0)
    ? toBigDecimal(0)
    : absNegativeHealths.maintenance.div(positiveHealths.maintenance);

  return {
    initial: initialMarginUsage,
    maintenance: maintenanceMarginUsage,
  };
}