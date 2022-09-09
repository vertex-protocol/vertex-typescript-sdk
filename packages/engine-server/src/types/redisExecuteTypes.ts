export interface RedisExecutionResult {
  status: 'success' | 'failure';
  error?: {
    message: string; // Revert message, defaulting to "" if none
  };
}

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

export interface RedisExecuteRequestByType {
  // String types are bytes
  liquidate_subaccount: string;
  deposit_collateral: string;
  withdraw_collateral: string;
  update_time: string;
  update_price: string;
  settle_pnl: string;
  place_order: RedisPlaceOrderParams;
  cancel_order: RedisCancelOrderParams;
}

export type RedisExecuteRequestType = keyof RedisExecuteRequestByType;

export interface RedisExecuteRequest {
  // Redis output key to where execution results are sent
  result_key: string;
  // Request, keyed by ONE type, value of request params, this isn't the best typing here, resolve later
  request: Partial<RedisExecuteRequestByType>;
}
