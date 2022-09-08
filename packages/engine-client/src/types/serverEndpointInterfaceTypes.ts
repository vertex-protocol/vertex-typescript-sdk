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

export interface GetExecuteResultQueryParams {
  result_key: string;
}

export type GetExecuteResultResponse = RedisExecutionResult;

export type QueryRequestQueryParams<
  T extends RedisQueryRequestType = RedisQueryRequestType,
> = RedisQueryRequestByType[T] & {
  type: T;
};

export type QueryRequestResponse<
  T extends RedisQueryRequestType = RedisQueryRequestType,
> = RedisQueryResponse<T>;
