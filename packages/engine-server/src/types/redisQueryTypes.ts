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
  all_products: Record<string, never>;
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

export interface RedisMarketLiquidityResponse {
  // Price, liquidity pairs
  bids: [priceX18: BigNumberish, liquidity: BigNumberish][];
  asks: [priceX18: BigNumberish, liquidity: BigNumberish][];
}

export interface RedisSubaccountOrdersResponse {
  subaccount_id: bigint;
  product_id: number;
  orders: RedisGetOrderResponse[];
}

export interface RedisMarketPriceResponse {
  product_id: number;
  bid_x18: BigNumberish;
  ask_x18: BigNumberish;
}

export interface RedisGetOrderResponse {
  product_id: number;
  subaccount: bigint;
  price_x18: BigNumberish;
  amount: BigNumberish;
  expiration: bigint;
  nonce: bigint;
  unfilled_amount: BigNumberish;
  digest: string;
}

export interface RedisValidateOrderResponse {
  product_id: number;
  order: string;
  valid: boolean;
}

export interface RedisQueryResponseByType {
  subaccount_info: RedisSubaccountInfoResponse;
  all_products: RedisAllProductsResponse;
  order: RedisGetOrderResponse;
  validate_order: RedisValidateOrderResponse;
  subaccount_orders: RedisSubaccountOrdersResponse;
  market_liquidity: RedisMarketLiquidityResponse;
  market_price: RedisMarketPriceResponse;
}

export interface RedisQueryResponse<
  TQueryType extends keyof RedisQueryResponseByType = RedisQueryRequestType,
> {
  status: 'success' | 'failure';
  data: RedisQueryResponseByType[TQueryType];
}
