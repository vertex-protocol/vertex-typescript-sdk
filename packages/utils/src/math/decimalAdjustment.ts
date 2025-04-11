import { BigDecimal, BigDecimalish, toBigDecimal } from './bigDecimal';

// All Vertex balances have 18 decimals. Ex. 1e18 = 1.0
export const VERTEX_PRODUCT_DECIMALS = 18;

/**
 * Adds the specified # of decimals to the number. For example, value = 1, decimals = 2, returns 100.
 *
 * @param value can be undefined for better developer experience. If undefined, returns undefined.
 * @param decimals number of decimal places to add, defaults to 18, which is the standard within Vertex
 */
export function addDecimals(value: undefined, decimals?: number): undefined;
export function addDecimals(value: number, decimals?: number): number;
export function addDecimals(
  value: BigDecimalish,
  decimals?: number,
): BigDecimal;

export function addDecimals(
  value: BigDecimalish | undefined,
  decimals: number = VERTEX_PRODUCT_DECIMALS,
): BigDecimalish | undefined {
  if (value == null) {
    return undefined;
  }

  const adjustedValue = toBigDecimal(value).multipliedBy(
    toBigDecimal(10).pow(decimals),
  );
  return typeof value === 'number' ? adjustedValue.toNumber() : adjustedValue;
}

/**
 * Removes the specified # of decimals from the number. For example, value = 100, decimals = 2, returns 1.
 *
 * @param value can be undefined for better developer experience. If undefined, returns undefined.
 * @param decimals number of decimal places to remove, defaults to 18, which is the standard within Vertex
 */
export function removeDecimals(value: undefined, decimals?: number): undefined;
export function removeDecimals(value: number, decimals?: number): number;
export function removeDecimals(
  value: BigDecimalish,
  decimals?: number,
): BigDecimal;
export function removeDecimals(
  value: BigDecimalish | undefined,
  decimals: number = VERTEX_PRODUCT_DECIMALS,
): BigDecimal | number | undefined {
  if (value == null) {
    return undefined;
  }

  const adjustedValue = toBigDecimal(value).dividedBy(
    toBigDecimal(10).pow(decimals),
  );
  return typeof value === 'number' ? adjustedValue.toNumber() : adjustedValue;
}
