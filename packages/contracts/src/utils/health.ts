import { BigDecimal } from '@vertex-protocol/utils/dist/math/bigDecimal';
import { toBigDecimal } from '@vertex-protocol/utils';
import { BalanceSide, HealthType, Product } from '../common';

/**
 * Given a balance and product, calculate the appropriate contract health
 *
 * @param amount
 * @param type
 * @param product
 */
export function calcHealthForAmount(
  product: Product,
  amount: BigDecimal,
  type: HealthType,
): BigDecimal {
  const weight = calcWeightForAmount(product, amount, type);
  return weight.times(amount);
}

/**
 * Given a balance amount and product, calculate the appropriate weight for health
 *
 * @param amount
 * @param type
 * @param product
 */
export function calcWeightForAmount(
  product: Product,
  amount: BigDecimal,
  type: HealthType,
): BigDecimal {
  if (amount.eq(0)) {
    return toBigDecimal(0);
  }

  const regularWeight = getRegularWeight(
    product,
    amount.gt(0) ? 'long' : 'short',
    type,
  );
  if (amount.gt(0)) {
    const amountPenalizedWeight = calcLongWeightWithPositionPenalty(
      product.largePositionPenalty,
      amount,
    );
    return BigDecimal.min(amountPenalizedWeight, regularWeight);
  } else {
    const amountPenalizedWeight = calcShortWeightWithPositionPenalty(
      product.largePositionPenalty,
      amount,
    );
    return BigDecimal.max(amountPenalizedWeight, regularWeight);
  }
}

/**
 * Get the proper weight term for the product
 *
 * @param product
 * @param side
 * @param type
 */
export function getRegularWeight(
  product: Product,
  side: BalanceSide,
  type: HealthType,
): BigDecimal {
  if (side === 'long') {
    return {
      initial: product.longWeightInitial,
      maintenance: product.longWeightMaintenance,
      unweighted: toBigDecimal(1),
    }[type];
  } else {
    return {
      initial: product.shortWeightInitial,
      maintenance: product.shortWeightMaintenance,
      unweighted: toBigDecimal(1),
    }[type];
  }
}

/**
 * Mimics the contracts' calculation of health weight for long positions given the penalty term and balance amount.
 *  `1.1 / (1 + penalty * sqrt(amount.abs()))`
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
 *  `0.9 * (1 + penalty * sqrt(amount.abs()))`
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
