export const SECONDS_IN_YEAR = 31536000;

export function millisToSeconds(millis: number) {
  return Math.floor(millis / 1000);
}

export function nowInSeconds() {
  return millisToSeconds(Date.now());
}
