import { RedisExecuteRequestByType, RedisExecuteRequestType } from '../types';

export function getRedisExecuteResultKey<
  TRequestType extends RedisExecuteRequestType,
>(
  requestType: TRequestType,
  params: RedisExecuteRequestByType[TRequestType],
): string {
  return `${requestType}_${JSON.stringify(params).replace(/\W/g, '')}`;
}
