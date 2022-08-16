/**
 * Util to conver to hour index for snapshots
 *
 * @param unixSeconds
 */
export function toHourIndex(unixSeconds: number) {
  return Math.floor(unixSeconds / 3600);
}
