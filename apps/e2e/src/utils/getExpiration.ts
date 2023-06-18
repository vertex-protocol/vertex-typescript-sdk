import { nowInSeconds } from '@vertex-protocol/utils';

export function getExpiration(secondsInFuture = 1000) {
  return nowInSeconds() + secondsInFuture;
}
