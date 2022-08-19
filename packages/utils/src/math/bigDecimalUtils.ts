import { BigDecimal } from './bigDecimal';
import { toBigDecimal } from './bigNumber';

/**
 * Util function to sum BigDecimal values, inspired by Lodash
 * @param collection
 * @param iteratee
 */

export function sumBigDecimalBy<T>(
  collection: T[] | null | undefined,
  iteratee: (value: T) => BigDecimal,
): BigDecimal {
  return (
    collection?.reduce((total, item) => {
      return total.plus(iteratee(item));
    }, toBigDecimal(0)) ?? toBigDecimal(0)
  );
}
