import { SubaccountSummaryResponse } from '../../query';
import { BigDecimal } from '@vertex-protocol/utils/dist/math/bigDecimal';
import { HealthStatus } from '../../common';
import { calcHealthForAmount } from '../health';

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
