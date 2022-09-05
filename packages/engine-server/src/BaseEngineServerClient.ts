import { createClient, RedisClientType } from 'redis';
import {
  EngineRedisClientOpts,
  RedisExecuteRequest,
  RedisExecuteRequestByType,
  RedisExecuteRequestType,
  RedisQueryRequest,
  RedisQueryRequestByType,
  RedisQueryRequestType,
} from './types';

export class BaseEngineServerClient {
  readonly redisEndpointUrl: string;
  readonly redisClient: RedisClientType;

  /**
   * Note - `connect()` must be called before any other methods are used
   */
  constructor({ url }: EngineRedisClientOpts) {
    this.redisEndpointUrl = url;
    this.redisClient = createClient({ url });
    this.redisClient.on('error', (err) => {
      console.error('[EngineRedisClient] Error:', err);
    });
  }

  /**
   * Async setup the client - connects to redis
   */
  async setup() {
    await this.redisClient.connect();
  }

  async execute<TRequestType extends RedisExecuteRequestType>(
    requestType: TRequestType,
    params: RedisExecuteRequestByType[TRequestType],
  ) {
    const resultKey = getRedisExecuteResultKey(requestType, params);
    const redisRequest: RedisExecuteRequest = {
      result_key: resultKey,
      request: {
        [requestType]: params,
      },
    };
    // Send

    // Wait for result key if needed (make this optional)
  }

  async query<TRequestType extends RedisQueryRequestType>(
    requestType: TRequestType,
    params: RedisQueryRequestByType[TRequestType],
  ) {
    // Get output key
    const redisRequest: RedisQueryRequest = {
      output_key: '',
      request: {
        [requestType]: params,
      },
    };
  }
}

function getRedisExecuteResultKey<TRequestType extends RedisExecuteRequestType>(
  requestType: TRequestType,
  params: RedisExecuteRequestByType[TRequestType],
): string | null {
  return null;
}

/**
 * Create the redis client and establish a connection
 * @param opts
 */
export async function createActiveEngineRedisClient(
  opts: EngineRedisClientOpts,
) {
  const client = new BaseEngineServerClient(opts);
  await client.setup();
  return client;
}
