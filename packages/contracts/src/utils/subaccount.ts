import { SubaccountSummaryResponse } from '../query';
import {
  BalanceSide,
  HealthStatus,
  HealthType,
  ProductEngineType,
} from '../common';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import {
  calcPerpBalanceNotionalValue,
  calcPerpBalanceValue,
  calcSpotBalanceValue,
} from './balanceValue';
import { calcHealthForAmount, getRegularWeight } from './health';

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

/**
 * Given a series of deltas, estimate the resulting subaccount summary. Modifies balance amounts and all healths, but
 * does NOT modify the raw contract product within each balance
 *
 * @param existingSummary
 * @param deltas
 */
export function getSubaccountSummaryWithDeltas(
  existingSummary: SubaccountSummaryResponse,
  deltas: { productId: number; amountDelta: BigDecimal }[],
): SubaccountSummaryResponse {
  // Clone the existing summary, this is somewhat hacky, but will work in 99% of circumstances
  // Note that the `contractProduct` within each balance will not be changed
  const newSummary: SubaccountSummaryResponse = {
    health: {
      ...existingSummary.health,
    },
    balances: existingSummary.balances.map((balance) => {
      return {
        ...balance,
      };
    }),
  };

  // Update the balances
  deltas.forEach((delta) => {
    const balance = newSummary.balances.find(
      (balance) => balance.productId === delta.productId,
    );
    if (balance == null) {
      throw Error(`Existing balance not found for product ${delta.productId}`);
    }

    // Update balance
    const startingHealths = balance.health;
    balance.amount = balance.amount.plus(delta.amountDelta);
    const endingHealths: HealthStatus = {
      initial: calcHealthForAmount(balance, balance.amount, 'initial'),
      maintenance: calcHealthForAmount(balance, balance.amount, 'maintenance'),
      unweighted: calcHealthForAmount(balance, balance.amount, 'unweighted'),
    };
    balance.health = endingHealths;

    // Update subaccount-wide health
    newSummary.health.initial = newSummary.health.initial.plus(
      endingHealths.initial.minus(startingHealths.initial),
    );
    newSummary.health.maintenance = newSummary.health.maintenance.plus(
      endingHealths.maintenance.minus(startingHealths.maintenance),
    );
    newSummary.health.unweighted = newSummary.health.unweighted.plus(
      endingHealths.unweighted.minus(startingHealths.unweighted),
    );
  });

  return newSummary;
}

export interface MaxPositionSizeEstimationParams {
  healthType: HealthType;
  // Side for the max position eestimation
  side: BalanceSide;
  productId: number;
  subaccountSummary: SubaccountSummaryResponse;
  // Usually the market bid/ask, depending on side
  executionPriceEstimate: BigDecimal;
}

/**
 * Returns the maximum new position size that can be placed given current health WITHOUT accounting for any existing balance for this product.
 * This means that if you have an existing balance for this product, its health must be subtracted from the current subaccount health.
 * This is an estimation via Newton's method, but also because we don't account for health losses due to differences
 * in execution and oracle price
 *
 * The max position is when the total sum of position healths is 0:
 *  sum(healths) = 0 = current health
 *  current health + (position health delta) = 0
 *  current health + (weight(amt) * amt * oraclePrice - (amt - existing_amt) * executionPrice) = 0
 *  (The execution price term is the estimated loss of quote health from executing the trade)
 *
 * solve for amt:
 *  amt = -current health / (weight * oraclePrice - executionPrice) if using regular weight, assume execution price = oracle price for now
 *  for large position penalized weight, we need to run Newton's method as weight is a function of amount
 *
 * NOTE: to calculate a max borrow position, simply pass `executionPriceEstimate` as zero, as there is no
 * quote gain from borrowing without trading
 *
 * @param params
 */
export function approximateMaxPositionSize(
  params: MaxPositionSizeEstimationParams,
) {
  const {
    subaccountSummary,
    side,
    healthType,
    productId,
    executionPriceEstimate,
  } = params;

  const tol = toBigDecimal(0.01);
  const dx = toBigDecimal(0.0001);
  const maxIters = 50;

  // Our starting health removes the health effect of the existing balance
  const existingBalance = subaccountSummary.balances.find(
    (balance) => balance.productId === productId,
  );
  if (existingBalance == null) {
    // Zero balances should still be returned, so this is an error case
    throw Error(`Balance info not found for the product ${productId}`);
  }

  const startingHealth = subaccountSummary.health[healthType].minus(
    existingBalance.health[healthType],
  );
  const regularWeight = getRegularWeight(existingBalance, side, healthType);

  // Take our initial guess at the amount implied by the regular weight, neglecting the quote health delta
  // if switching sides
  const start = startingHealth
    .negated()
    .div(
      regularWeight
        .times(existingBalance.oraclePrice)
        .minus(executionPriceEstimate),
    );

  // Given an amount, calculates health from simulating the trade
  const calcHealthForSize = (amount: BigDecimal) => {
    const healthForAmount = calcHealthForAmount(
      existingBalance,
      amount,
      healthType,
    );
    // Assume quote health is unweighted as an approximation
    const quoteHealthDelta = amount
      .minus(existingBalance.amount) // i.e. Amount delta
      .times(executionPriceEstimate)
      .negated();

    return startingHealth.plus(healthForAmount.plus(quoteHealthDelta));
  };

  // Run Newton's method: X_{n+1} = X_n - f(X_n) / f'(X_n)
  let curr = toBigDecimal(start);
  let iters = 0;

  while (calcHealthForSize(curr).abs().gt(tol)) {
    if (iters > maxIters) {
      console.warn(
        'Iteration limit reached in approximateMaxPositionSize, returning initial guess',
      );
      return start;
    }
    iters++;

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
    console.warn(
      `Different signs for initial guess and Newton's method. Initial guess: ${start.toString()}, with position penalty ${curr.toString()}`,
    );
    return start;
  }
}
