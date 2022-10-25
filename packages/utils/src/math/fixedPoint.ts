import { BigNumber, BigNumberish } from 'ethers';
import { fromBn, toBn } from 'evm-bn';
import { toBigDecimal } from './bigNumber';
import { BigDecimal } from './bigDecimal';

/**
 * Converts a value to X18 fixed point representation
 *
 * @param val
 */
export function toX18(val: BigNumberish | BigDecimal): BigNumber {
  return toFixedPoint(val, 18);
}

/**
 * Converts X18 fixed point representation to a floating point value
 *
 * @param val
 */
export function fromX18(val: BigNumberish): BigDecimal {
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
export function fromFixedPoint(val: BigNumberish, decimals = 18): BigDecimal {
  return toBigDecimal(fromBn(BigNumber.from(val), decimals ? decimals : 18));
}

/**
 * Convert a float number representation to a fixed point decimal.
 * Defaults to 18, which is X18 in contracts
 * ex. toFixedPoint(3.14, 2) => BN("314").
 *
 * @see https://github.com/paulrberg/evm-bn
 * @param val
 * @param decimals Number of decimals to include in the fixed point representation
 */
export function toFixedPoint(
  val: BigNumberish | BigDecimal,
  decimals = 18,
): BigNumber {
  return toBn(val.toString(), decimals ? decimals : 18);
}
