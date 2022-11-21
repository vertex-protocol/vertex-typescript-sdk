import { BigNumberish } from 'ethers';
import {
  EngineServerPerpBalance,
  EngineServerPerpProduct,
  EngineServerSpotBalance,
  EngineServerSpotProduct,
} from './serverQueryModelTypes';

export interface EngineServerNoncesParams {
  address: string;
}

export interface EngineServerSubaccountInfoQueryParams {
  subaccount_id: number;
  txns?: Array<
    | {
        mint_lp: {
          product_id: number;
          subaccount_id: number;
          amount_base_x18: string;
          quote_amount_low_x18: string;
          quote_amount_high_x18: string;
        };
      }
    | {
        burn_lp: {
          product_id: number;
          subaccount_id: number;
          amount_lp_x18: string;
        };
      }
    | {
        apply_delta: {
          product_id: number;
          subaccount_id: number;
          amount_delta_x18: string;
          v_quote_delta_x18: string;
        };
      }
  >;
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

export interface EngineServerMaxOrderSizeQueryParams {
  sender: string;
  subaccount_name: string;
  product_id: number;
  price_x18: string;
  direction: 'long' | 'short';
}

export interface EngineServerQueryRequestByType {
  nonces: EngineServerNoncesParams;
  all_products: Record<string, never>;
  subaccount_info: Omit<EngineServerSubaccountInfoQueryParams, 'txns'> & {
    // JSON serialized txns
    txns?: string;
  };
  market_price: EngineServerMarketPriceQueryParams;
  order: EngineServerGetOrderQueryParams;
  validate_order: EngineServerValidateOrderQueryParams;
  subaccount_orders: EngineServerSubaccountOrdersQueryParams;
  market_liquidity: EngineServerMarketLiquidityQueryParams;
  max_order_size: EngineServerMaxOrderSizeQueryParams;
}

export type EngineServerQueryRequestType = keyof EngineServerQueryRequestByType;

export interface EngineServerNoncesResponse {
  order_nonce: number;
  tx_nonce: number;
}

export interface EngineServerSubaccountInfoResponse {
  exists: boolean;
  subaccount_id: BigNumberish;
  healths: {
    health_x18: BigNumberish;
    assets_x18: BigNumberish;
    liabilities_x18: BigNumberish;
  }[];
  spot_balances: EngineServerSpotBalance[];
  perp_balances: EngineServerPerpBalance[];
  spot_products: EngineServerSpotProduct[];
  perp_products: EngineServerPerpProduct[];
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

export interface EngineServerMaxOrderSizeResponse {
  max_order_size: BigNumberish;
}

export interface EngineServerQueryResponseByType {
  nonces: EngineServerNoncesResponse;
  subaccount_info: EngineServerSubaccountInfoResponse;
  all_products: EngineServerAllProductsResponse;
  order: EngineServerGetOrderResponse;
  validate_order: EngineServerValidateOrderResponse;
  subaccount_orders: EngineServerSubaccountOrdersResponse;
  market_liquidity: EngineServerMarketLiquidityResponse;
  market_price: EngineServerMarketPriceResponse;
  max_order_size: EngineServerMaxOrderSizeResponse;
}

export interface EngineServerQueryResponse<
  TQueryType extends keyof EngineServerQueryResponseByType = EngineServerQueryRequestType,
> {
  status: 'success' | 'failure';
  data: EngineServerQueryResponseByType[TQueryType];
}
