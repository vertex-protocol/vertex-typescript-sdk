import { BigDecimal, BigDecimalish, toBigDecimal } from './bigDecimal';

/**
 * Converts a value to X18 fixed point representation
 *
 * @param val
 */
export function toX18(val: BigDecimalish): bigint {
  return toFixedPoint(val, 18);
}

/**
 * Converts X18 fixed point representation to a floating point value
 *
 * @param val
 */
export function fromX18(val: bigint | string): BigDecimal {
  return fromFixedPoint(val, 18);
}

/**
 * Convert a fixed point BigNumber to its float string representation, with optional number of fixed point decimal places
 * ex. fromFixedPoint(BN(314), 2) => "3.14"
 *
 * @see https://github.com/paulrberg/evm-bn
 * @param val
 * @param decimals number of fixed point decimal places in `val`
 */
export function fromFixedPoint(
  val: bigint | string,
  decimals = 18,
): BigDecimal {
  return toBigDecimal(val).div(toBigDecimal(10).pow(decimals));
}

/**
 * Convert a float number representation to a fixed point decimal.
 * Defaults to 18, which is X18 in contracts
 * ex. toFixedPoint(3.14, 2) => bigint("314").
 *
 * @param val
 * @param decimals Number of decimals to include in the fixed point representation
 */
export function toFixedPoint(val: BigDecimalish, decimals = 18): bigint {
  const bigDecimalVal = val instanceof BigDecimal ? val : toBigDecimal(val);
  // toFixed is required here to avoid exponential notation
  const valToParse = bigDecimalVal
    .times(toBigDecimal(10).pow(decimals))
    .toFixed(0);

  return BigInt(valToParse);
}
