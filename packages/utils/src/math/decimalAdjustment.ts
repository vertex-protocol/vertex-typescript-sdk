import { BigDecimal, BigDecimalish, toBigDecimal } from './bigDecimal';

// All Vertex balances have 18 decimals. Ex. 1e18 = 1.0
export const VERTEX_PRODUCT_DECIMALS = 18;

/**
 * Adds the specified # of decimals to the number. For example, value = 1, decimals = 2, returns 100.
 *
 * @param value can be undefined for better developer experience. If undefined, returns undefined.
 * @param decimals number of decimal places to add, defaults to 18, which is the standard within Vertex
 */
export function addDecimals<T extends number | BigDecimal | undefined>(
  value: T,
  decimals: number = VERTEX_PRODUCT_DECIMALS,
): T {
  const getResult = () => {
    if (value == null) {
      return undefined;
    }

    const adjustedValue = toBigDecimal(value).multipliedBy(
      toBigDecimal(10).pow(decimals),
    );
    return typeof value === 'number' ? adjustedValue.toNumber() : adjustedValue;
  };

  return getResult() as T;
}

/**
 * Removes the specified # of decimals from the number. For example, value = 100, decimals = 2, returns 1.
 *
 * @param value can be undefined for better developer experience. If undefined, returns undefined.
 * @param decimals number of decimal places to remove, defaults to 18, which is the standard within Vertex
 */
export function removeDecimals<T extends number | BigDecimal | undefined>(
  value: T,
  decimals: number = VERTEX_PRODUCT_DECIMALS,
): T {
  const getResult = () => {
    if (value == null) {
      return undefined;
    }

    const adjustedValue = toBigDecimal(value).dividedBy(
      toBigDecimal(10).pow(decimals),
    );
    return typeof value === 'number' ? adjustedValue.toNumber() : adjustedValue;
  };

  return getResult() as T;
}

/**
 * Converts X18 fixed point representation to a floating point value
 *
 * @param val
 */
export function fromX18(val: BigDecimalish): BigDecimal {
  return removeDecimals(toBigDecimal(val), 18);
}
