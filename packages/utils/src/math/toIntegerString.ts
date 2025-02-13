import { BigDecimalish, toBigDecimal } from './bigDecimal';

/**
 * Converts a BigDecimalish value to string
 *
 * @param val
 */
export function toIntegerString(val: BigDecimalish): string {
  return toBigDecimal(val).toFixed(0);
}
