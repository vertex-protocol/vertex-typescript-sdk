import { RedisExecuteRequestByType, RedisExecuteRequestType } from '../types';

export function getRedisExecuteResultKey<
  TRequestType extends RedisExecuteRequestType,
>(
  requestType: TRequestType,
  params: RedisExecuteRequestByType[TRequestType],
): string | null {
  switch (requestType) {
    case 'place_order':
      return null;
    case 'cancel_order':
      return null;
    default:
      return `${requestType}_${JSON.stringify(params)}`;
  }
  return null;
}
