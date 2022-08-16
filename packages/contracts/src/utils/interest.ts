import { ISpotEngine } from '../typechain-types';
import {
  BigDecimal,
  BigDecimalish,
  fromX18,
  SECONDS_IN_YEAR,
  toBigDecimal,
} from '@vertex-protocol/utils';

/**
 * Calculate amount total borrowed for a product
 *
 * @param state SpotEngine product state
 */
export function calcTotalBorrowed(
  state: ISpotEngine.StateStructOutput,
): BigDecimal {
  return fromX18(state.totalBorrowsNormalizedX18).multipliedBy(
    fromX18(state.cumulativeBorrowsMultiplierX18),
  );
}

/**
 * Calculate amount total deposited for a product
 *
 * @param state SpotEngine product state
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
 * @param product SpotEngine product
 */
export function calcUtilizationRatio(product: ISpotEngine.ProductStructOutput) {
  return calcTotalBorrowed(product.state)
    .abs()
    .div(calcTotalDeposited(product.state));
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
 * {@label BORROW_INTEREST_CALC}
 * @param product SpotEngine product
 */
export function calcBorrowRatePerSecond(
  product: ISpotEngine.ProductStructOutput,
) {
  const {
    interestFloorX18,
    interestInflectionUtilX18,
    interestSmallCapX18,
    interestLargeCapX18,
  } = product.config;
  const utilization = calcUtilizationRatio(product);
  const pastInflection = utilization.lt(fromX18(interestInflectionUtilX18));

  let annualRate: BigDecimal;
  if (pastInflection) {
    const utilizationTerm = fromX18(interestLargeCapX18).times(
      toBigDecimal(1)
        .minus(utilization)
        .div(toBigDecimal(1).minus(fromX18(interestInflectionUtilX18))),
    );
    annualRate = fromX18(interestFloorX18)
      .plus(fromX18(interestSmallCapX18))
      .plus(utilizationTerm);
  } else {
    const utilizationTerm = utilization
      .div(fromX18(interestInflectionUtilX18))
      .times(fromX18(interestSmallCapX18));
    annualRate = fromX18(interestFloorX18).plus(utilizationTerm);
  }

  return annualRate.div(SECONDS_IN_YEAR);
}

/**
 * Calculates borrower interest rate compounded for a period of time.
 *
 * @param product SpotEngine product
 * @param seconds Number of seconds for the time period
 */
export function calcBorrowRateForTimeRange(
  product: ISpotEngine.ProductStructOutput,
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
 * @param product SpotEngine product
 * @param seconds Number of seconds for the time period
 * @param interestFeeFrac Fraction of paid borrower interest that is paid as a fee (0.2 = 20% fee)
 */
export function calcRealizedDepositRateForTimeRange(
  product: ISpotEngine.ProductStructOutput,
  seconds: BigDecimalish,
  interestFeeFrac: BigDecimalish,
) {
  const utilization = calcUtilizationRatio(product);
  return utilization
    .times(calcBorrowRateForTimeRange(product, seconds))
    .times(toBigDecimal(1).minus(toBigDecimal(interestFeeFrac)));
}
