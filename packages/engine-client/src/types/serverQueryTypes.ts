import {
  EngineServerPerpBalance,
  EngineServerPerpProduct,
  EngineServerProductType,
  EngineServerSpotBalance,
  EngineServerSpotProduct,
} from './serverQueryModelTypes';

export interface EngineServerQueryNoncesParams {
  address: string;
}

export interface EngineServerQuerySubaccountInfoParams {
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

export interface EngineServerQuerySymbolsParams {
  product_type?: EngineServerProductType;
  product_ids?: number[];
}

export interface EngineServerQueryMarketPriceParams {
  product_id: number;
}

export interface EngineServerQueryMarketPricesParams {
  product_ids: number[];
}

export interface EngineServerQueryOrderParams {
  product_id: number;
  digest: string;
}

export interface EngineServerQueryValidateOrderParams {
  product_id: number;
  // Bytes for order, does not need to be signed
  order: string;
}

export interface EngineServerQueryOrdersParams {
  sender: string;
  product_ids: number[];
}

export interface EngineServerQuerySubaccountOrdersParams {
  sender: string;
  product_id: number;
}

export interface EngineServerQuerySubaccountFeeRatesParams {
  sender: string;
}

export interface EngineServerQueryMarketLiquidityParams {
  product_id: number;
  depth: number;
}

export interface EngineServerQueryMaxWithdrawableParams {
  sender: string;
  product_id: number;
  // If not given, engine defaults to true (leverage/borrow enabled)
  spot_leverage: string | null;
}

export interface EngineServerQueryMaxOrderSizeParams {
  sender: string;
  product_id: number;
  price_x18: string;
  direction: 'long' | 'short';
  // If not given, engine defaults to true (leverage/borrow enabled)
  spot_leverage: string | null;
}

export interface EngineServerQueryMaxMintLpParams {
  sender: string;
  product_id: number;
  // If not given, engine defaults to true (leverage/borrow enabled)
  spot_leverage: string | null;
}

export interface EngineServerQueryLinkedSignerParams {
  subaccount: string;
}

export interface EngineServerQueryRequestByType {
  contracts: Record<string, never>;
  status: Record<string, never>;
  nonces: EngineServerQueryNoncesParams;
  symbols: EngineServerQuerySymbolsParams;
  all_products: Record<string, never>;
  health_groups: Record<string, never>;
  subaccount_info: Omit<EngineServerQuerySubaccountInfoParams, 'txns'> & {
    // JSON serialized txns
    txns?: string;
  };
  market_price: EngineServerQueryMarketPriceParams;
  market_prices: EngineServerQueryMarketPricesParams;
  order: EngineServerQueryOrderParams;
  orders: EngineServerQueryOrdersParams;
  validate_order: EngineServerQueryValidateOrderParams;
  fee_rates: EngineServerQuerySubaccountFeeRatesParams;
  subaccount_orders: EngineServerQuerySubaccountOrdersParams;
  market_liquidity: EngineServerQueryMarketLiquidityParams;
  max_order_size: EngineServerQueryMaxOrderSizeParams;
  max_withdrawable: EngineServerQueryMaxWithdrawableParams;
  max_lp_mintable: EngineServerQueryMaxMintLpParams;
  linked_signer: EngineServerQueryLinkedSignerParams;
}

export type EngineServerQueryRequestType = keyof EngineServerQueryRequestByType;

export type EngineServerQueryRequest<
  TRequestType extends EngineServerQueryRequestType,
> = {
  type: TRequestType;
} & EngineServerQueryRequestByType[TRequestType];

export interface EngineServerQueryContractsResponse {
  chain_id: string;
  endpoint_addr: string;
  // Index is product ID
  book_addrs: string[];
}

// Unless in active state, engine is not fully operational
export type EngineServerQueryStatusResponse =
  | 'started'
  | 'active'
  | 'stopping'
  | 'syncing'
  | 'live_syncing'
  | 'failed';

export interface EngineServerQueryNoncesResponse {
  order_nonce: string;
  tx_nonce: string;
}

export interface EngineServerQuerySubaccountInfoResponse {
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

export interface EngineServerSymbol {
  type: EngineServerProductType;
  product_id: number;
  symbol: string;
  price_increment_x18: string;
  size_increment: string;
  min_size: string;
  min_depth_x18: string;
  max_spread_rate_x18: string;
  maker_fee_rate_x18: string;
  taker_fee_rate_x18: string;
  long_weight_initial_x18: string;
  long_weight_maintenance_x18: string;
}

export interface EngineServerQuerySymbolsResponse {
  symbols: Record<string, EngineServerSymbol>;
}

export interface EngineServerQueryAllProductsResponse {
  spot_products: EngineServerSpotProduct[];
  perp_products: EngineServerPerpProduct[];
}

export interface EngineServerQueryHealthGroupsResponse {
  health_groups: [spotProductId: number, perpProductId: number][];
}

// Price, liquidity pairs
export type EngineServerPriceTickLiquidity = [
  priceX18: string,
  liquidity: string,
];

export interface EngineServerQueryMarketLiquidityResponse {
  bids: EngineServerPriceTickLiquidity[];
  asks: EngineServerPriceTickLiquidity[];
}

export interface EngineServerSubaccountOrders {
  sender: string;
  product_id: number;
  orders: EngineServerOrder[];
}

export type EngineServerQuerySubaccountOrdersResponse =
  EngineServerSubaccountOrders;

export interface EngineServerQueryProductOrdersResponse {
  sender: string;
  product_orders: EngineServerSubaccountOrders[];
}

export interface EngineServerQuerySubaccountFeeRatesResponse {
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

export type EngineServerQueryMarketPriceResponse = EngineServerMarketPrice;

export interface EngineServerQueryMarketPricesResponse {
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
  order_type: string;
}

export type EngineServerQueryOrderResponse = EngineServerOrder;

export interface EngineServerQueryValidateOrderResponse {
  product_id: number;
  order: string;
  valid: boolean;
}

export interface EngineServerQueryMaxOrderSizeResponse {
  max_order_size: string;
}

export interface EngineServerQueryMaxWithdrawableResponse {
  max_withdrawable: string;
}

export type EngineServerQueryTimeResponse = number;

export interface EngineServerQueryMaxMintLpResponse {
  max_base_amount: string;
  max_quote_amount: string;
}

export interface EngineServerQueryIpBlockResponse {
  blocked: boolean;
  reason: string;
}

export interface EngineServerQueryLinkedSignerResponse {
  linked_signer: string;
}

export interface EngineServerQueryResponseByType {
  contracts: EngineServerQueryContractsResponse;
  status: EngineServerQueryStatusResponse;
  nonces: EngineServerQueryNoncesResponse;
  subaccount_info: EngineServerQuerySubaccountInfoResponse;
  symbols: EngineServerQuerySymbolsResponse;
  all_products: EngineServerQueryAllProductsResponse;
  health_groups: EngineServerQueryHealthGroupsResponse;
  order: EngineServerQueryOrderResponse;
  orders: EngineServerQueryProductOrdersResponse;
  validate_order: EngineServerQueryValidateOrderResponse;
  subaccount_orders: EngineServerQuerySubaccountOrdersResponse;
  fee_rates: EngineServerQuerySubaccountFeeRatesResponse;
  market_liquidity: EngineServerQueryMarketLiquidityResponse;
  market_price: EngineServerQueryMarketPriceResponse;
  market_prices: EngineServerQueryMarketPricesResponse;
  max_order_size: EngineServerQueryMaxOrderSizeResponse;
  max_withdrawable: EngineServerQueryMaxWithdrawableResponse;
  max_lp_mintable: EngineServerQueryMaxMintLpResponse;
  linked_signer: EngineServerQueryLinkedSignerResponse;
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
