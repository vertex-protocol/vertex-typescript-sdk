import { BigNumberish } from 'ethers';
import {
  EngineServerPerpBalance,
  EngineServerPerpProduct,
  EngineServerSpotBalance,
  EngineServerSpotProduct,
} from './serverQueryModelTypes';

export interface EngineServerSubaccountInfoQueryParams {
  subaccount_id: number;
}

export interface EngineServerMarketPriceQueryParams {
  product_id: number;
}

export interface EngineServerGetOrderQueryParams {
  product_id: number;
  digest: string;
}

export interface EngineServerValidateOrderQueryParams {
  product_id: number;
  // Bytes for order, does not need to be signed
  order: string;
}

export interface EngineServerSubaccountOrdersQueryParams {
  sender: string;
  subaccount_name: string;
  product_id: number;
}

export interface EngineServerMarketLiquidityQueryParams {
  product_id: number;
  depth: number;
}

export interface EngineServerQueryRequestByType {
  all_products: Record<string, never>;
  subaccount_info: EngineServerSubaccountInfoQueryParams;
  market_price: EngineServerMarketPriceQueryParams;
  order: EngineServerGetOrderQueryParams;
  validate_order: EngineServerValidateOrderQueryParams;
  subaccount_orders: EngineServerSubaccountOrdersQueryParams;
  market_liquidity: EngineServerMarketLiquidityQueryParams;
}

export type EngineServerQueryRequestType = keyof EngineServerQueryRequestByType;

export interface EngineServerQueryRequest {
  // EngineServer output key to where responses are sent
  result_key: string;
  // Request, keyed by ONE type, value of request params, this isn't the best typing here, resolve later
  request: Partial<EngineServerQueryRequestByType>;
}

export interface EngineServerSubaccountInfoResponse {
  subaccount_id: BigNumberish;
  initial_health_x18: BigNumberish;
  maintenance_health_x18: BigNumberish;
  pnl_health_x18: BigNumberish;
  spot_balances: EngineServerSpotBalance[];
  perp_balances: EngineServerPerpBalance[];
  all_products: EngineServerAllProductsResponse;
}

export interface EngineServerAllProductsResponse {
  spot_products: EngineServerSpotProduct[];
  perp_products: EngineServerPerpProduct[];
}

// Price, liquidity pairs
export type EngineServerPriceTickLiquidity = [
  priceX18: BigNumberish,
  liquidity: BigNumberish,
];

export interface EngineServerMarketLiquidityResponse {
  bids: EngineServerPriceTickLiquidity[];
  asks: EngineServerPriceTickLiquidity[];
}

export interface EngineServerSubaccountOrdersResponse {
  sender: string;
  subaccount_name: string;
  product_id: number;
  orders: EngineServerGetOrderResponse[];
}

export interface EngineServerMarketPriceResponse {
  product_id: number;
  bid_x18: BigNumberish;
  ask_x18: BigNumberish;
}

export interface EngineServerGetOrderResponse {
  product_id: number;
  sender: string;
  subaccount_name: string;
  price_x18: BigNumberish;
  amount: BigNumberish;
  expiration: BigNumberish;
  nonce: BigNumberish;
  unfilled_amount: BigNumberish;
  digest: string;
  placed_at: number;
}

export interface EngineServerValidateOrderResponse {
  product_id: number;
  order: string;
  valid: boolean;
}

export interface EngineServerQueryResponseByType {
  subaccount_info: EngineServerSubaccountInfoResponse;
  all_products: EngineServerAllProductsResponse;
  order: EngineServerGetOrderResponse;
  validate_order: EngineServerValidateOrderResponse;
  subaccount_orders: EngineServerSubaccountOrdersResponse;
  market_liquidity: EngineServerMarketLiquidityResponse;
  market_price: EngineServerMarketPriceResponse;
}

export interface EngineServerQueryResponse<
  TQueryType extends keyof EngineServerQueryResponseByType = EngineServerQueryRequestType,
> {
  status: 'success' | 'failure';
  data: EngineServerQueryResponseByType[TQueryType];
}
