export interface RedisPlaceOrderParams {
  product_id: number;
  // Bytes
  digest: string;
  // Bytes
  signed_order: string;
}

export interface RedisCancelOrderParams {
  product_id: number;
  // Bytes
  digest: string;
  // Bytes
  signed_order: string;
}

// TODO: extract these actions into a common type?
export interface RedisExecuteRequestByType {
  place_order: RedisPlaceOrderParams;
  cancel_order: RedisCancelOrderParams;
}

export type RedisExecuteRequestType = keyof RedisExecuteRequestByType;

export interface RedisExecuteRequest {
  // Redis output key to where execution results are sent
  result_key: string | null;
  // Request, keyed by ONE type, value of request params, this isn't the best typing here, resolve later
  request: Partial<RedisExecuteRequestByType>;
}
