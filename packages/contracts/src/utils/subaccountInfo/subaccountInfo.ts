import { SubaccountSummaryResponse } from '../../query';
import {
  BalanceWithProduct,
  ProductEngineType,
  QUOTE_PRODUCT_ID,
} from '../../common';
import {
  BigDecimal,
  sumBigDecimalBy,
  toBigDecimal,
} from '@vertex-protocol/utils';
import {
  calcLpBalanceValue,
  calcPerpBalanceNotionalValue,
  calcPerpBalanceValue,
  calcSpotBalanceValue,
} from '../balanceValue';
import {
  calcUnweightedHealthExcludingZeroHealthProducts,
  isZeroHealth,
} from './utils';

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
 * Leverage calculated as sum(abs(unweighted health for non-quote balances)) / unweighted health
 *
 * @param summary
 */
export function calcSubaccountLeverage(summary: SubaccountSummaryResponse) {
  const unweightedHealth =
    calcUnweightedHealthExcludingZeroHealthProducts(summary);
  if (unweightedHealth.isZero()) {
    return toBigDecimal(0);
  }

  const numerator = sumBigDecimalBy(summary.balances, (balance) => {
    if (balance.productId === QUOTE_PRODUCT_ID || isZeroHealth(balance)) {
      return toBigDecimal(0);
    }
    const balanceValue =
      balance.type === ProductEngineType.SPOT
        ? calcSpotBalanceValue(balance).abs()
        : calcPerpBalanceNotionalValue(balance);
    return balanceValue.plus(calcLpBalanceValue(balance));
  });

  return numerator.dividedBy(unweightedHealth);
}

export interface MarginUsageFractions {
  maintenance: BigDecimal;
  initial: BigDecimal;
}

/**
 * Calculate margin usage fractions bounded to [0, 1]
 * unbounded margin usage = (unweighted health - initial/maint health) / unweighted health
 * iff subaccount has borrows or perp positions, and 0 otherwise.
 *
 * @param summary
 */
export function calcSubaccountMarginUsageFractions(
  summary: SubaccountSummaryResponse,
): MarginUsageFractions {
  const unweightedHealth =
    calcUnweightedHealthExcludingZeroHealthProducts(summary);
  const initialHealth = summary.health.initial.health;
  const maintenanceHealth = summary.health.maintenance.health;

  const zeroMarginUsage: MarginUsageFractions = {
    initial: toBigDecimal(0),
    maintenance: toBigDecimal(0),
  };

  if (unweightedHealth.isZero()) {
    return zeroMarginUsage;
  }

  let hasBorrowsOrPerps = false;
  for (const balance of summary.balances) {
    if (balance.amount.lt(0)) {
      // Either a spot borrow or a perp position
      hasBorrowsOrPerps = true;
      break;
    } else if (balance.type === ProductEngineType.PERP) {
      if (!balance.amount.isZero() || !balance.lpAmount.isZero()) {
        hasBorrowsOrPerps = true;
        break;
      }
    }
  }
  if (!hasBorrowsOrPerps) {
    return zeroMarginUsage;
  }

  const initialMarginUsage = unweightedHealth
    .minus(initialHealth)
    .div(unweightedHealth);
  const maintenanceMarginUsage = unweightedHealth
    .minus(maintenanceHealth)
    .div(unweightedHealth);

  // If the respective healths are negative, then already "underwater", so max out the margin usage
  return {
    initial: initialHealth.isNegative()
      ? toBigDecimal(1)
      : BigDecimal.min(initialMarginUsage, 1),
    maintenance: maintenanceHealth.isNegative()
      ? toBigDecimal(1)
      : BigDecimal.min(maintenanceMarginUsage, 1),
  };
}

/**
 * Calculates margin used for a single balance. The health contribution given is negative if a balance is a liability,
 * so the margin consumed is max(0, -healthContribution)
 *
 * @param balance
 */
export function calcBalanceMarginUsed(balance: BalanceWithProduct) {
  return {
    initial: BigDecimal.max(0, balance.healthContributions.initial.negated()),
    maintenance: BigDecimal.max(
      0,
      balance.healthContributions.maintenance.negated(),
    ),
  };
}
