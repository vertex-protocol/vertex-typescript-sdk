import {
  RedisExecuteRequestByType,
  RedisExecuteRequestType,
  RedisExecutionResult,
  RedisQueryRequestByType,
  RedisQueryRequestType,
  RedisQueryResponse,
} from '@vertex-protocol/engine-server';
import { EngineClientOpts } from './types';

export class EngineBaseClient {
  readonly opts: EngineClientOpts;

  constructor(opts: EngineClientOpts) {
    this.opts = opts;
  }

  protected async query<TRequestType extends RedisQueryRequestType>(
    requestType: TRequestType,
    params: RedisQueryRequestByType[TRequestType],
  ): Promise<RedisQueryResponse<TRequestType>> {
    throw Error('Not implemented');
  }

  protected async execute<TRequestType extends RedisExecuteRequestType>(
    requestType: TRequestType,
    params: RedisExecuteRequestByType[TRequestType],
  ): Promise<string | null> {
    // Send execute request to server
    return '';
  }

  protected async getExecuteResult(
    resultKey: string,
  ): Promise<RedisExecutionResult> {
    throw Error('Not implemented');
  }
}
