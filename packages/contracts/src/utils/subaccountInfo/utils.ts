import { BalanceWithProduct } from '../../common';
import { SubaccountSummaryResponse } from '../../query';

/**
 * Zero health products have a long weight of 0 and a short weight of 2 (i.e. borrows are disabled and deposits do not contribute health)
 * @param balance
 */
export function isZeroHealth(balance: BalanceWithProduct) {
  return balance.longWeightInitial.eq(0) && balance.shortWeightInitial.eq(2);
}

/**
 * Calculates unweighted health excluding zero health products (specifically, VRTX).
 * This is important for margin usage & leverage calculations, where we want to use this adjusted health
 *
 * @param summary
 */
export function calcUnweightedHealthExcludingZeroHealthProducts(
  summary: SubaccountSummaryResponse,
) {
  let unweightedHealth = summary.health.unweighted.health;

  summary.balances.forEach((balance) => {
    if (isZeroHealth(balance)) {
      unweightedHealth = unweightedHealth.minus(
        balance.healthContributions.unweighted,
      );
    }
  });

  return unweightedHealth;
}
