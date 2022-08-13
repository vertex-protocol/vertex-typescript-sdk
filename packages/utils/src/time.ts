export function millisToSeconds(millis: number) {
  return Math.floor(millis / 1000);
}

export function nowInSeconds() {
  return millisToSeconds(Date.now());
}
