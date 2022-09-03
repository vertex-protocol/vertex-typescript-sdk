import { SubaccountSummaryResponse } from '../query';
import { ProductEngineType } from '../common';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import {
  calcPerpBalanceNotionalValue,
  calcPerpBalanceValue,
  calcSpotBalanceValue,
} from './balanceValue';

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
    if (balance.health.initialHealth.gt(0)) {
      positiveHealths.initial = positiveHealths.initial.plus(
        balance.health.initialHealth,
      );
      positiveHealths.maintenance = positiveHealths.maintenance.plus(
        balance.health.maintenanceHealth,
      );
    } else {
      absNegativeHealths.initial = absNegativeHealths.initial.plus(
        balance.health.initialHealth.abs(),
      );
      absNegativeHealths.maintenance = absNegativeHealths.maintenance.plus(
        balance.health.maintenanceHealth.abs(),
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

/**
 * UNTESTED
 * Returns the maximum new position size (absolute) that can be placed given current health and market conditions.
 *
 * The max position is when the total sum of position healths is 0:
 *  sum(healths) = 0 = current health
 *  current health + (position health delta) = 0
 *  current health + (weight(amt) * amt * oraclePrice - amt * executionPrice) = 0
 *  (The execution price term is the estimated loss of quote health from executing the trade)
 *
 * solve for amt:
 *  amt = -current health / (weight * oraclePrice - executionPrice) if using regular weight
 *  for large position penalized weight, we need to run Newton's method as weight is a function of amount
 *
 * @param currentHealth current health of the subaccount
 * @param oraclePrice oracle price of the product
 * @param executionPriceEstimate estimated execution price of the product, for example, current market price, or limit price
 * @param regularWeight weight of the product - either long or short, initial or maintenance
 * @param penaltyWeightCalculator function to calculate penalty weight given amount,
 *  see: {@link getLongLargePositionPenaltyWeightCalculator:CONTRACTS} and  {@link getShortLargePositionPenaltyWeightCalculator:CONTRACTS}
 */
export function approximateMaxPositionSize(
  currentHealth: BigDecimal,
  oraclePrice: BigDecimal,
  executionPriceEstimate: BigDecimal,
  regularWeight: BigDecimal,
  penaltyWeightCalculator: (amount: BigDecimal) => BigDecimal,
) {
  const tol = toBigDecimal(0.01);
  const dx = toBigDecimal(0.0001);

  // Take our initial guess at the amount implied by the regular weight
  const start = currentHealth
    .negated()
    .div(regularWeight.times(oraclePrice).minus(executionPriceEstimate));

  // Given an amount, calculates health from simulating the trade
  function calcHealthForSize(amount: BigDecimal) {
    const weight = penaltyWeightCalculator(amount);
    const amountHealth = amount.multipliedBy(oraclePrice).multipliedBy(weight);
    return amountHealth.minus(amount.times(executionPriceEstimate));
  }

  // Run Newton's method: X_{n+1} = X_n - f(X_n) / f'(X_n)
  let curr = toBigDecimal(start);
  while (calcHealthForSize(curr).gt(tol)) {
    // f'(X_n) = (f(X_n + dx) - f(X_n - dx)) / 2dx
    const derivative = calcHealthForSize(curr.plus(dx))
      .minus(calcHealthForSize(curr.minus(dx)))
      .div(dx.multipliedBy(2));
    // Newton's method step
    curr = curr.minus(calcHealthForSize(curr).div(derivative));
  }

  if (start.gte(0) && curr.gte(0)) {
    return BigDecimal.min(start, curr);
  } else if (start.lt(0) && curr.lt(0)) {
    return BigDecimal.max(start, curr);
  } else {
    throw Error(
      `Different signs for initial guess and Newton's method. With weight: ${start}, with position penalty ${curr}`,
    );
  }
}

/**
 * Returns a function to calculate the large position penalty weight for longs:
 * `1.1 / (1 + penalty * sqrt(amount.abs()))`
 * {@label CONTRACTS}
 *
 * @param penaltyTerm
 */
export function getLongLargePositionPenaltyWeightCalculator(
  penaltyTerm: BigDecimal,
) {
  return (amount: BigDecimal) =>
    toBigDecimal(1.1).div(
      toBigDecimal(1).plus(penaltyTerm.multipliedBy(amount.abs().sqrt())),
    );
}

/**
 * Returns a function to calculate the large position penalty weight for shorts:
 * `0.9 * (1 + penalty * sqrt(amount.abs()))`
 * {@label CONTRACTS}
 *
 * @param penaltyTerm
 */
export function getShortLargePositionPenaltyWeightCalculator(
  penaltyTerm: BigDecimal,
) {
  return (amount: BigDecimal) =>
    toBigDecimal(0.9).times(
      toBigDecimal(1).plus(penaltyTerm.multipliedBy(amount.abs().sqrt())),
    );
}
