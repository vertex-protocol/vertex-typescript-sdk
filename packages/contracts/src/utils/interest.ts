import { ISpotEngine } from '../typechain-types';
import {
  BigDecimal,
  BigDecimalish,
  fromX18,
  SECONDS_IN_YEAR,
  toBigDecimal,
} from '@vertex-protocol/utils';

export function calcTotalBorrowed(
  state: ISpotEngine.StateStructOutput,
): BigDecimal {
  return fromX18(state.totalBorrowsNormalizedX18).multipliedBy(
    fromX18(state.cumulativeBorrowsMultiplierX18),
  );
}

export function calcTotalDeposited(
  state: ISpotEngine.StateStructOutput,
): BigDecimal {
  return fromX18(state.totalDepositsNormalizedX18).multipliedBy(
    fromX18(state.cumulativeDepositsMultiplierX18),
  );
}

export function calcUtilizationRatio(product: ISpotEngine.ProductStructOutput) {
  return calcTotalBorrowed(product.state)
    .abs()
    .div(calcTotalDeposited(product.state));
}

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

  return annualRate.div(SECONDS_IN_YEAR).plus(1);
}

export function calcBorrowRateForTimeRange(
  product: ISpotEngine.ProductStructOutput,
  seconds: BigDecimalish,
) {
  return calcBorrowRatePerSecond(product).pow(toBigDecimal(seconds));
}

export function calcRealizedDepositRateForTimeRange(
  product: ISpotEngine.ProductStructOutput,
  seconds: BigDecimalish,
  interestFeeFrac: BigDecimalish,
) {
  const utilization = calcUtilizationRatio(product);
  return utilization
    .times(calcBorrowRateForTimeRange(product, seconds).minus(1))
    .times(toBigDecimal(1).minus(toBigDecimal(interestFeeFrac)));
}
