import { BigDecimalish, toBigDecimal } from '@vertex-protocol/utils';

/**
 * Util to convert to hour index for snapshots
 *
 * @param unixSeconds
 */
export function toHourIndex(unixSeconds: number) {
  return Math.floor(unixSeconds / 3600);
}

/**
 * Approximate time in seconds for a given hour index
 *
 * @param hourIndex
 */
export function fromHourIndex(hourIndex: BigDecimalish) {
  return toBigDecimal(hourIndex).toNumber() * 3600;
}
