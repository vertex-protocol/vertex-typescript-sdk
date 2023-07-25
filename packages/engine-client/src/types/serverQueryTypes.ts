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

export interface EngineServerMarketPricesQueryParams {
  product_ids: number[];
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

export interface EngineServerOrdersQueryParams {
  sender: string;
  product_ids: number[];
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
  spot_leverage: string | null;
}

export interface EngineServerMaxOrderSizeQueryParams {
  sender: string;
  product_id: number;
  price_x18: string;
  direction: 'long' | 'short';
  // If not given, engine defaults to true (leverage/borrow enabled)
  spot_leverage: string | null;
}

export interface EngineServerMaxMintLpQueryParams {
  sender: string;
  product_id: number;
  // If not given, engine defaults to true (leverage/borrow enabled)
  spot_leverage: string | null;
}

export interface EngineServerLinkedSignerParams {
  subaccount: string;
}

export interface EngineServerQueryRequestByType {
  contracts: Record<string, never>;
  status: Record<string, never>;
  nonces: EngineServerNoncesParams;
  all_products: Record<string, never>;
  health_groups: Record<string, never>;
  subaccount_info: Omit<EngineServerSubaccountInfoQueryParams, 'txns'> & {
    // JSON serialized txns
    txns?: string;
  };
  market_price: EngineServerMarketPriceQueryParams;
  market_prices: EngineServerMarketPricesQueryParams;
  order: EngineServerGetOrderQueryParams;
  orders: EngineServerOrdersQueryParams;
  validate_order: EngineServerValidateOrderQueryParams;
  fee_rates: EngineServerSubaccountFeeRatesParams;
  subaccount_orders: EngineServerSubaccountOrdersQueryParams;
  market_liquidity: EngineServerMarketLiquidityQueryParams;
  max_order_size: EngineServerMaxOrderSizeQueryParams;
  max_withdrawable: EngineServerMaxWithdrawableQueryParams;
  max_lp_mintable: EngineServerMaxMintLpQueryParams;
  linked_signer: EngineServerLinkedSignerParams;
}

export type EngineServerQueryRequestType = keyof EngineServerQueryRequestByType;

export type EngineServerQueryRequest<
  TRequestType extends EngineServerQueryRequestType,
> = {
  type: TRequestType;
} & EngineServerQueryRequestByType[TRequestType];

export interface EngineServerContractsResponse {
  chain_id: string;
  endpoint_addr: string;
  // Index is product ID
  book_addrs: string[];
}

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
    health: string;
    assets: string;
    liabilities: string;
  }[];
  // First index is product ID, each subarray is of length 3 [initial, maintenance, unweighted]
  health_contributions: string[][];
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

export interface EngineServerHealthGroupsResponse {
  health_groups: [spotProductId: number, perpProductId: number][];
}

// Price, liquidity pairs
export type EngineServerPriceTickLiquidity = [
  priceX18: string,
  liquidity: string,
];

export interface EngineServerMarketLiquidityResponse {
  bids: EngineServerPriceTickLiquidity[];
  asks: EngineServerPriceTickLiquidity[];
}

export interface EngineServerSubaccountOrders {
  sender: string;
  product_id: number;
  orders: EngineServerOrder[];
}

export type EngineServerSubaccountOrdersResponse = EngineServerSubaccountOrders;

export interface EngineServerProductOrdersResponse {
  sender: string;
  product_orders: EngineServerSubaccountOrders[];
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

export interface EngineServerMarketPrice {
  product_id: number;
  bid_x18: string;
  ask_x18: string;
}

export type EngineServerMarketPriceResponse = EngineServerMarketPrice;

export interface EngineServerMarketPricesResponse {
  market_prices: EngineServerMarketPrice[];
}

export interface EngineServerOrder {
  product_id: number;
  sender: string;
  price_x18: string;
  amount: string;
  expiration: string;
  nonce: string;
  unfilled_amount: string;
  digest: string;
  placed_at: number;
}

export type EngineServerGetOrderResponse = EngineServerOrder;

export interface EngineServerValidateOrderResponse {
  product_id: number;
  order: string;
  valid: boolean;
}

export interface EngineServerMaxOrderSizeResponse {
  max_order_size: string;
}

export interface EngineServerMaxWithdrawableResponse {
  max_withdrawable: string;
}

export type EngineServerTimeResponse = number;

export interface EngineServerMaxMintLpResponse {
  max_base_amount: string;
  max_quote_amount: string;
}

export interface EngineServerCheckIpResponse {
  ip: string;
  blocked: boolean;
  // ISO country code
  locale: string;
}

export interface EngineServerLinkedSignerResponse {
  linked_signer: string;
}

export interface EngineServerQueryResponseByType {
  contracts: EngineServerContractsResponse;
  status: EngineServerStatusResponse;
  nonces: EngineServerNoncesResponse;
  subaccount_info: EngineServerSubaccountInfoResponse;
  all_products: EngineServerAllProductsResponse;
  health_groups: EngineServerHealthGroupsResponse;
  order: EngineServerGetOrderResponse;
  orders: EngineServerProductOrdersResponse;
  validate_order: EngineServerValidateOrderResponse;
  subaccount_orders: EngineServerSubaccountOrdersResponse;
  fee_rates: EngineServerSubaccountFeeRatesResponse;
  market_liquidity: EngineServerMarketLiquidityResponse;
  market_price: EngineServerMarketPriceResponse;
  market_prices: EngineServerMarketPricesResponse;
  max_order_size: EngineServerMaxOrderSizeResponse;
  max_withdrawable: EngineServerMaxWithdrawableResponse;
  max_lp_mintable: EngineServerMaxMintLpResponse;
  linked_signer: EngineServerLinkedSignerResponse;
}

export interface EngineServerQuerySuccessResponse<
  TQueryType extends keyof EngineServerQueryResponseByType = EngineServerQueryRequestType,
> {
  status: 'success';
  data: EngineServerQueryResponseByType[TQueryType];
}

export interface EngineServerQueryFailureResponse {
  status: 'failure';
  error: string;
  error_code: number;
}

export type EngineServerQueryResponse<
  TQueryType extends keyof EngineServerQueryResponseByType = EngineServerQueryRequestType,
> =
  | EngineServerQuerySuccessResponse<TQueryType>
  | EngineServerQueryFailureResponse;
