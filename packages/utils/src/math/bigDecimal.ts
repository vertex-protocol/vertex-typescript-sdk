import { BigNumberish } from 'ethers';
import { BigNumber as BigDecimal } from 'bignumber.js';

// Renames `BigNumber` type from `bignumber.js`.
export { BigNumber as BigDecimal } from 'bignumber.js';

/**
 * BigDecimal is a renamed `BigNumber` type from `bignumber.js`. BigDecimalish is akin to `BigNumberish`, but
 * includes valid values & instances for BigDecimal.
 *
 * @see https://mikemcl.github.io/bignumber.js/
 */
export type BigDecimalish = BigDecimal | BigDecimal.Value | BigNumberish;

/**
 * Converts a value to an instance of BigDecimal
 *
 * @param val
 */
export function toBigDecimal(val: BigDecimalish): BigDecimal {
  const bnConstructorVal = (() => {
    if (val instanceof BigDecimal) {
      return val;
    } else if (typeof val === 'string' || typeof val === 'number') {
      return val;
    }
    return val.toString();
  })();
  return new BigDecimal(bnConstructorVal);
}
