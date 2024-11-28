import { BigNumber as BigDecimal } from 'bignumber.js';
import { BigNumberish } from 'ethers';

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
    // This is unlikely to occur, but it's here for completeness. Uses the suggestion here: https://typescript-eslint.io/rules/no-base-to-string/#alternatives
    return JSON.stringify(val);
  })();
  return new BigDecimal(bnConstructorVal);
}
