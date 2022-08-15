import { BigNumber, BigNumberish } from 'ethers';
import { fromBn, toBn } from 'evm-bn';
import { toBigDecimal } from './bigNumber';
import { BigDecimal } from './bigDecimal';

export function toX18(val: BigNumberish | BigDecimal): BigNumber {
  return toFixedPoint(val, 18);
}

export function fromX18(val: BigNumber): BigDecimal {
  return fromFixedPoint(val, 18);
}

/**
 * Convert a fixed point BigNumber to its float string representation
 * ex. fromFixedPoint(BN(314), 2) => "3.14"
 */
export function fromFixedPoint(val: BigNumber, decimals = 18): BigDecimal {
  return toBigDecimal(fromBn(val, decimals));
}

/**
 * Convert a float number representation to a fixed point decimal.
 * Defaults to 18, which is X18 in contracts
 * ex. toFixedPoint(3.14, 2) => BN("314").
 */
export function toFixedPoint(
  val: BigNumberish | BigDecimal,
  decimals = 18,
): BigNumber {
  return toBn(val.toString(), decimals);
}
