import { ISpotEngine } from '../typechain-types';
import {
  BigDecimal,
  BigDecimalish,
  fromX18,
  SECONDS_IN_YEAR,
  toBigDecimal,
} from '@vertex-protocol/utils';
import { SpotProduct } from '../common';

/**
 * Calculate amount total borrowed for a product
 *
 * @param state SpotEngine product state. Uses the base contract type as it is used to map to the internal SpotProduct type.
 */
export function calcTotalBorrowed(
  state: ISpotEngine.StateStructOutput,
): BigDecimal {
  return fromX18(state.totalBorrowsNormalizedX18).multipliedBy(
    fromX18(state.cumulativeBorrowsMultiplierX18),
  );
}

/**
 * Calculate amount total deposited for a product.
 *
 * @param state SpotEngine product state. Uses the base contract type as it is used to map to the internal SpotProduct type.
 */
export function calcTotalDeposited(
  state: ISpotEngine.StateStructOutput,
): BigDecimal {
  return fromX18(state.totalDepositsNormalizedX18).multipliedBy(
    fromX18(state.cumulativeDepositsMultiplierX18),
  );
}

/**
 * Calculates utilization ratio = abs(total borrowed / total deposited)
 *
 * @param product Spot product
 */
export function calcUtilizationRatio(product: SpotProduct) {
  if (product.totalDeposited.eq(0)) {
    return toBigDecimal(0);
  }
  return product.totalBorrowed.abs().div(product.totalDeposited);
}

/**
 * Calculates per-second borrow interest rate for a product. For example, a returned rate of 0.1 indicates 10% borrower
 * interest. The calculation for interest rate is as follows:
 *
 * If utilization ratio > inflection:
 *  annual rate = (1 - utilization ratio) / (1 - inflection) * interestLargeCap + interestFloor + interestSmallCap
 *
 * If utilization ratio < inflection:
 *  annual rate = utilization * interestSmallCap / inflection + utilization
 *
 * The returned rate is annual rate / 31536000 seconds per year.
 *
 * {@label UTILS}
 * @param product Spot product
 */
export function calcBorrowRatePerSecond(product: SpotProduct) {
  const {
    interestFloor,
    interestInflectionUtil,
    interestSmallCap,
    interestLargeCap,
  } = product;
  const utilization = calcUtilizationRatio(product);
  const pastInflection = utilization.lt(interestInflectionUtil);

  let annualRate: BigDecimal;
  if (pastInflection) {
    const utilizationTerm = interestLargeCap.times(
      toBigDecimal(1)
        .minus(utilization)
        .div(toBigDecimal(1).minus(interestInflectionUtil)),
    );
    annualRate = interestFloor.plus(interestSmallCap).plus(utilizationTerm);
  } else {
    const utilizationTerm = utilization
      .div(interestInflectionUtil)
      .times(interestSmallCap);
    annualRate = interestFloor.plus(utilizationTerm);
  }

  return annualRate.div(SECONDS_IN_YEAR);
}

/**
 * Calculates borrower interest rate compounded for a period of time.
 *
 * @param product Spot product
 * @param seconds Number of seconds for the time period
 */
export function calcBorrowRateForTimeRange(
  product: SpotProduct,
  seconds: BigDecimalish,
) {
  return calcBorrowRatePerSecond(product)
    .plus(1)
    .pow(toBigDecimal(seconds))
    .minus(1);
}

/**
 * Calculate depositor interest rate compounded for a period of time.
 *
 * @param product Spot product
 * @param seconds Number of seconds for the time period
 * @param interestFeeFrac Fraction of paid borrower interest that is paid as a fee (0.2 = 20% fee)
 */
export function calcRealizedDepositRateForTimeRange(
  product: SpotProduct,
  seconds: BigDecimalish,
  interestFeeFrac: BigDecimalish,
) {
  const utilization = calcUtilizationRatio(product);
  return utilization
    .times(calcBorrowRateForTimeRange(product, seconds))
    .times(toBigDecimal(1).minus(toBigDecimal(interestFeeFrac)));
}
