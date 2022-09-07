import { BigNumberish } from 'ethers';
import {
  RedisPerpBalance,
  RedisPerpProduct,
  RedisSpotBalance,
  RedisSpotProduct,
} from './redisQueryModelTypes';

export interface RedisSubaccountInfoQueryParams {
  subaccount_id: number;
}

export interface RedisMarketPriceQueryParams {
  product_id: number;
}

export interface RedisGetOrderQueryParams {
  product_id: number;
  digest: string;
}

export interface RedisValidateOrderQueryParams {
  product_id: number;
  // Bytes for order, does not need to be signed
  order: string;
}

export interface RedisSubaccountOrdersQueryParams {
  subaccount_id: number;
  product_id: number;
}

export interface RedisMarketLiquidityQueryParams {
  product_id: number;
  depth: number;
}

export interface RedisQueryRequestByType {
  subaccount_info: RedisSubaccountInfoQueryParams;
  market_price: RedisMarketPriceQueryParams;
  order: RedisGetOrderQueryParams;
  validate_order: RedisValidateOrderQueryParams;
  subaccount_orders: RedisSubaccountOrdersQueryParams;
  market_liquidity: RedisMarketLiquidityQueryParams;
}

export type RedisQueryRequestType = keyof RedisQueryRequestByType;

export interface RedisQueryRequest {
  // Redis output key to where responses are sent
  result_key: string;
  // Request, keyed by ONE type, value of request params, this isn't the best typing here, resolve later
  request: Partial<RedisQueryRequestByType>;
}

export interface RedisSubaccountInfoResponse {
  subaccount_id: BigNumberish;
  spot_balances: RedisSpotBalance[];
  perp_balances: RedisPerpBalance[];
}

export interface RedisAllProductsResponse {
  spot_products: RedisSpotProduct[];
  perp_products: RedisPerpProduct[];
}

export interface RedisQueryResponseByType {
  subaccount_info: RedisSubaccountInfoResponse;
  all_products: RedisAllProductsResponse;
}

export interface RedisQueryResponse {
  status: 'success' | 'failure';
  // Data is returned with key of type, so this is the proper typing to use here
  data: RedisQueryResponseByType;
}
