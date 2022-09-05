import { BigDecimal } from '@vertex-protocol/utils/dist/math/bigDecimal';
import { toBigDecimal } from '@vertex-protocol/utils';

/**
 * Mimics the contracts' calculation of health weight for long positions given the penalty term and balance amount.
 *
 * @param penaltyTerm
 * @param amount
 */
export function calcLongWeightWithPositionPenalty(
  penaltyTerm: BigDecimal,
  amount: BigDecimal,
) {
  return toBigDecimal(1.1).div(
    toBigDecimal(1).plus(penaltyTerm.multipliedBy(amount.abs().sqrt())),
  );
}

/**
 * Mimics the contracts' calculation of health weight for short positions given the penalty term and balance amount.
 *
 * @param penaltyTerm
 * @param amount
 */
export function calcShortWeightWithPositionPenalty(
  penaltyTerm: BigDecimal,
  amount: BigDecimal,
) {
  return toBigDecimal(0.9).times(
    toBigDecimal(1).plus(penaltyTerm.multipliedBy(amount.abs().sqrt())),
  );
}
