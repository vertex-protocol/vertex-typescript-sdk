import { BigDecimal } from './math/bigDecimal';
import { BigNumber } from 'ethers';

/**
 * Util for converting any BigDecimal types into a string so that it can be logged nicely
 */
export function toPrintableObject(obj: unknown): unknown {
  if (obj == null) {
    return null;
  }
  if (obj instanceof BigDecimal || BigNumber.isBigNumber(obj)) {
    return obj.toString();
  }
  if (Array.isArray(obj)) {
    return obj.map(toPrintableObject);
  }
  if (typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        toPrintableObject(value),
      ]),
    );
  }
  return obj;
}
