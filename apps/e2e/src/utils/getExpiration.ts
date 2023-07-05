import { nowInSeconds } from '@vertex-protocol/utils';
import {
  getExpirationTimestamp,
  OrderExpirationType,
} from '@vertex-protocol/contracts';

export function getExpiration(
  expirationType: OrderExpirationType = 'default',
  secondsInFuture = 1000,
) {
  return getExpirationTimestamp(
    expirationType,
    nowInSeconds() + secondsInFuture,
  );
}
