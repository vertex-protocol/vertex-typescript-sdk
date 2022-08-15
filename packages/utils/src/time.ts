export const SECONDS_IN_YEAR = 31536000;

/**
 * Converts timestamp in milliseconds to seconds
 * @param millis
 */
export function millisToSeconds(millis: number) {
  return Math.floor(millis / 1000);
}

/**
 * Current time in seconds
 */
export function nowInSeconds() {
  return millisToSeconds(Date.now());
}
