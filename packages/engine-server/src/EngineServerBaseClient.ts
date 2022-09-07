import { createClient, RedisClientType } from 'redis';
import {
  EngineServerClientOpts,
  RedisExecuteRequest,
  RedisExecuteRequestByType,
  RedisExecuteRequestType,
  RedisExecutionResult,
  RedisQueryRequest,
  RedisQueryRequestByType,
  RedisQueryRequestType,
} from './types';
import { getRedisExecuteResultKey, getRedisQueryResultKey } from './utils';

const DEFAULT_TIMEOUT_MS = 1000 * 10; // 10s

export class EngineServerBaseClient {
  readonly redisEndpointUrl: string;
  readonly redisClient: RedisClientType;

  /**
   * Note - `connect()` must be called before any other methods are used
   */
  constructor({ url }: EngineServerClientOpts) {
    this.redisEndpointUrl = url;
    this.redisClient = createClient({ url });
    this.redisClient.on('error', (err) => {
      console.error('[EngineServerClient] Error:', err);
    });
  }

  /**
   * Async setup the client - connects to redis
   */
  async setup() {
    await this.redisClient.connect();
  }

  async teardown() {
    await this.redisClient.quit();
  }

  async execute<TRequestType extends RedisExecuteRequestType>(
    requestType: TRequestType,
    params: RedisExecuteRequestByType[TRequestType],
  ): Promise<string | null> {
    // Get request
    const resultKey = getRedisExecuteResultKey(requestType, params);
    const redisRequest: RedisExecuteRequest = {
      result_key: resultKey,
      request: {
        [requestType]: params,
      },
    };
    // Send
    await this.sendRedisRequest('execute', redisRequest);

    return resultKey;
  }

  async waitForExecuteResult(
    resultKey: string,
    timeout = DEFAULT_TIMEOUT_MS,
  ): Promise<RedisExecutionResult> {
    return this.waitForRedisResponse(resultKey, timeout);
  }

  async query<TRequestType extends RedisQueryRequestType, TResponseType>(
    requestType: TRequestType,
    params: RedisQueryRequestByType[TRequestType],
  ): Promise<TResponseType> {
    // Get request
    const resultKey = getRedisQueryResultKey(requestType, params);
    const redisRequest: RedisQueryRequest = {
      result_key: resultKey,
      request: {
        [requestType]: params,
      },
    };
    // Send and wait for response
    await this.sendRedisRequest('query', redisRequest);
    return this.waitForRedisResponse(resultKey);
  }

  private async sendRedisRequest(
    requestType: 'execute' | 'query',
    data: RedisQueryRequest | RedisExecuteRequest,
  ) {
    await this.redisClient.rPush(requestType, JSON.stringify(data));
  }

  private async waitForRedisResponse<TOutput>(
    key: string,
    timeout = DEFAULT_TIMEOUT_MS,
  ): Promise<TOutput> {
    const result = await this.redisClient.blPop(key, timeout);
    if (!result) {
      throw Error(`Timeout waiting for redis response for key ${key}`);
    }

    return JSON.parse(result.element);
  }
}
