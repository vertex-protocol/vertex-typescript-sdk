import {
  getExpirationTimestamp,
  OrderExpirationType,
} from '@vertex-protocol/contracts';
import { nowInSeconds } from '@vertex-protocol/utils';

export function getExpiration(
  expirationType: OrderExpirationType = 'default',
  secondsInFuture = 1000,
  reduceOnly = false,
) {
  return getExpirationTimestamp({
    expirationTime: nowInSeconds() + secondsInFuture,
    type: expirationType,
    reduceOnly,
  });
}
