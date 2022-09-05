export interface RedisSubaccountInfoQueryParams {
  subaccount_id: number;
}

export interface RedisMarketPriceQueryParams {
  product_id: number;
}

export interface RedisQueryRequestByType {
  subaccount_info: RedisSubaccountInfoQueryParams;
  market_price: RedisMarketPriceQueryParams;
}

export type RedisQueryRequestType = keyof RedisQueryRequestByType;

export interface RedisQueryRequest {
  // Redis output key to where responses are sent
  output_key: string;
  // Request, keyed by ONE type, value of request params, this isn't the best typing here, resolve later
  request: Partial<RedisQueryRequestByType>;
}
