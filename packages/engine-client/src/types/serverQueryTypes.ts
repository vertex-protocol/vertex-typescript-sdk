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
  subaccount: string;
  txns?: Array<
    | {
        mint_lp: {
          product_id: number;
          subaccount: string;
          amount_base: string;
          quote_amount_low: string;
          quote_amount_high: string;
        };
      }
    | {
        burn_lp: {
          product_id: number;
          subaccount: string;
          amount_lp: string;
        };
      }
    | {
        apply_delta: {
          product_id: number;
          subaccount: string;
          amount_delta: string;
          v_quote_delta: string;
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
  product_id: number;
}

export interface EngineServerSubaccountFeeRatesParams {
  sender: string;
}

export interface EngineServerMarketLiquidityQueryParams {
  product_id: number;
  depth: number;
}

export interface EngineServerMaxWithdrawableQueryParams {
  sender: string;
  product_id: number;
  // If not given, engine defaults to true (leverage/borrow enabled)
  spot_leverage: boolean | null;
}

export interface EngineServerMaxOrderSizeQueryParams {
  sender: string;
  product_id: number;
  price_x18: string;
  direction: 'long' | 'short';
  // If not given, engine defaults to true (leverage/borrow enabled)
  spot_leverage: boolean | null;
}

export interface EngineServerQueryRequestByType {
  status: Record<string, never>;
  nonces: EngineServerNoncesParams;
  all_products: Record<string, never>;
  subaccount_info: Omit<EngineServerSubaccountInfoQueryParams, 'txns'> & {
    // JSON serialized txns
    txns?: string;
  };
  market_price: EngineServerMarketPriceQueryParams;
  order: EngineServerGetOrderQueryParams;
  validate_order: EngineServerValidateOrderQueryParams;
  fee_rates: EngineServerSubaccountFeeRatesParams;
  subaccount_orders: EngineServerSubaccountOrdersQueryParams;
  market_liquidity: EngineServerMarketLiquidityQueryParams;
  max_order_size: EngineServerMaxOrderSizeQueryParams;
  max_withdrawable: EngineServerMaxWithdrawableQueryParams;
}

export type EngineServerQueryRequestType = keyof EngineServerQueryRequestByType;

// Unless in active state, engine is not fully operational
export type EngineServerStatusResponse =
  | 'started'
  | 'active'
  | 'stopping'
  | 'syncing'
  | 'live_syncing'
  | 'failed';

export interface EngineServerNoncesResponse {
  order_nonce: string;
  tx_nonce: string;
}

export interface EngineServerSubaccountInfoResponse {
  exists: boolean;
  subaccount: string;
  healths: {
    health: BigNumberish;
    assets: BigNumberish;
    liabilities: BigNumberish;
  }[];
  spot_count: number;
  perp_count: number;
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
  product_id: number;
  orders: EngineServerGetOrderResponse[];
}

export interface EngineServerSubaccountFeeRatesResponse {
  liquidation_sequencer_fee: string;
  health_check_sequencer_fee: string;
  taker_sequencer_fee: string;
  // Product ID is the index
  withdraw_sequencer_fees: string[];
  taker_fee_rates_x18: string[];
  maker_fee_rates_x18: string[];
}

export interface EngineServerMarketPriceResponse {
  product_id: number;
  bid_x18: BigNumberish;
  ask_x18: BigNumberish;
}

export interface EngineServerGetOrderResponse {
  product_id: number;
  sender: string;
  price_x18: BigNumberish;
  amount: BigNumberish;
  expiration: BigNumberish;
  nonce: string;
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

export interface EngineServerMaxWithdrawableResponse {
  max_withdrawable: BigNumberish;
}

export interface EngineServerCheckIpResponse {
  ip: string;
  blocked: boolean;
  // ISO country code
  locale: string;
}

export interface EngineServerQueryResponseByType {
  status: EngineServerStatusResponse;
  nonces: EngineServerNoncesResponse;
  subaccount_info: EngineServerSubaccountInfoResponse;
  all_products: EngineServerAllProductsResponse;
  order: EngineServerGetOrderResponse;
  validate_order: EngineServerValidateOrderResponse;
  subaccount_orders: EngineServerSubaccountOrdersResponse;
  fee_rates: EngineServerSubaccountFeeRatesResponse;
  market_liquidity: EngineServerMarketLiquidityResponse;
  market_price: EngineServerMarketPriceResponse;
  max_order_size: EngineServerMaxOrderSizeResponse;
  max_withdrawable: EngineServerMaxWithdrawableResponse;
}

export interface EngineServerQueryResponse<
  TQueryType extends keyof EngineServerQueryResponseByType = EngineServerQueryRequestType,
> {
  status: 'success' | 'failure';
  data: EngineServerQueryResponseByType[TQueryType];
}
