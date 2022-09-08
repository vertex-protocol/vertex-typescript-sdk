import {
  RedisExecuteRequestByType,
  RedisExecuteRequestType,
  RedisExecutionResult,
  RedisQueryRequestByType,
  RedisQueryRequestType,
  RedisQueryResponse,
} from '@vertex-protocol/engine-server';

export interface ExecuteRequestBody<
  T extends RedisExecuteRequestType = RedisExecuteRequestType,
> {
  type: T;
  params: RedisExecuteRequestByType[T];
}

export interface ExecuteRequestResponse {
  result_key: string | null;
}

export type GetExecuteResultQueryParams = ExecuteRequestResponse;

export type GetExecuteResultResponse = RedisExecutionResult;

export interface QueryRequestQueryParams<
  T extends RedisQueryRequestType = RedisQueryRequestType,
> {
  type: T;
  params: RedisQueryRequestByType[T];
}

export type QueryRequestResponse<T extends RedisQueryRequestType> =
  RedisQueryResponse<T>;
