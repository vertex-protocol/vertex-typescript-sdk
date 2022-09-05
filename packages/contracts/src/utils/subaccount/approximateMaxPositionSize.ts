import { BalanceSide, HealthType } from '../../common';
import { SubaccountSummaryResponse } from '../../query';
import { BigDecimal } from '@vertex-protocol/utils/dist/math/bigDecimal';
import { toBigDecimal } from '@vertex-protocol/utils';
import { calcHealthForAmount, getRegularWeight } from '../health';

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
