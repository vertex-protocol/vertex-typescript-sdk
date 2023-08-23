import { IndexerEventType } from './IndexerEventType';
import {
  IndexerServerCandlestick,
  IndexerServerEvent,
  IndexerServerMarketSnapshot,
  IndexerServerMarketSnapshotInterval,
  IndexerServerMatchEvent,
  IndexerServerOraclePrice,
  IndexerServerOrder,
  IndexerServerProductSnapshot,
  IndexerServerTx,
} from './serverModelTypes';

/**
 * Params
 */
export interface IndexerServerSummaryParams {
  subaccount: string;
  timestamp: number[];
}

export interface IndexerServerRewardsParams {
  address: string;
}

export interface IndexerServerReferralCodeParams {
  subaccount: string;
}

export interface IndexerServerFundingRateParams {
  product_id: number;
}

export interface IndexerServerFundingRatesParams {
  product_ids: number[];
}

export interface IndexerServerPriceParams {
  product_id: number;
}

export interface IndexerServerPerpPricesParams {
  product_ids: number[];
}

export interface IndexerServerOraclePricesParams {
  product_ids: number[];
}

export interface IndexerServerCandlesticksParams {
  product_id: number;
  granularity: number;
  // Seconds
  max_time?: number;
  limit: number;
}

export interface IndexerServerProductsParams {
  product_id: number;
  max_time?: number;
  limit: number;
  // submission_idx for pagination, inclusive
  idx?: string;
}

export interface IndexerServerMultiProductsParams {
  product_ids: number[];
  max_time?: number;
}

export interface IndexerServerEventsParams {
  subaccount?: string;
  product_ids?: number[];
  event_types?: IndexerEventType[];
  // Descending order for idx (time), defaults to true
  desc?: boolean;
  // submission_idx for pagination, inclusive
  idx?: string;
  max_time?: number;
  limit?:
    | {
        raw: number;
      }
    | {
        txs: number;
      };
}

export interface IndexerServerOrdersParams {
  subaccount?: string;
  product_ids?: number[];
  digests?: string[];
  max_time?: number;
  limit?: number;
  // submission_idx for pagination, inclusive
  idx?: string;
}

export interface IndexerServerMatchEventsParams {
  subaccount?: string;
  product_ids?: number[];
  max_time?: number;
  limit: number;
  // submission_idx for pagination, inclusive
  idx?: string;
}

export interface IndexerServerLinkedSignerParams {
  subaccount: string;
}

export interface IndexerServerMarketSnapshotsParams {
  interval: IndexerServerMarketSnapshotInterval;
  // Defaults to all
  product_ids?: number[];
}

// Request
export interface IndexerServerQueryRequestByType {
  summary: IndexerServerSummaryParams;
  rewards: IndexerServerRewardsParams;
  referral_code: IndexerServerReferralCodeParams;
  funding_rate: IndexerServerFundingRateParams;
  funding_rates: IndexerServerFundingRatesParams;
  price: IndexerServerPriceParams;
  perp_prices: IndexerServerPerpPricesParams;
  oracle_price: IndexerServerOraclePricesParams;
  candlesticks: IndexerServerCandlesticksParams;
  products: IndexerServerProductsParams;
  product_snapshots: IndexerServerMultiProductsParams;
  events: IndexerServerEventsParams;
  orders: IndexerServerOrdersParams;
  matches: IndexerServerMatchEventsParams;
  usdc_price: Record<string, never>;
  linked_signer_rate_limit: IndexerServerLinkedSignerParams;
  market_snapshots: IndexerServerMarketSnapshotsParams;
}

export type IndexerServerQueryRequestType =
  keyof IndexerServerQueryRequestByType;

/**
 * Responses
 */
export interface IndexerServerSummaryResponse {
  // Map of timestamp requested -> latest events corresponding to each product
  events: Record<string, IndexerServerEvent[]>;
}

export interface IndexerServerSubaccountRewardsForProduct {
  product_id: number;
  q_score: string;
  sum_q_min: string;
  uptime: number;
  maker_volume: string;
  taker_volume: string;
  maker_fee: string;
  taker_fee: string;
  // Already include adjustment for decimals
  maker_tokens: string;
  taker_tokens: string;
  taker_referral_tokens: string;
  rebates: string;
}

export interface IndexerServerGlobalRewardsForProduct {
  product_id: number;
  reward_coefficient: string;
  q_scores: string;
  maker_volumes: string;
  taker_volumes: string;
  maker_fees: string;
  taker_fees: string;
  maker_tokens: string;
  taker_tokens: string;
}

export interface IndexerServerRewardEpoch {
  epoch: number;
  start_time: string;
  period: string;
  num_eligible_addresses: number;
  // Per product ID
  address_rewards: IndexerServerSubaccountRewardsForProduct[];
  global_rewards: IndexerServerGlobalRewardsForProduct[];
}

export interface IndexerServerRewardsResponse {
  rewards: IndexerServerRewardEpoch[];
  update_time: string;
  total_referrals: string;
}

export interface IndexerServerReferralCodeResponse {
  referral_code: string | null;
}

export interface IndexerServerFundingRate {
  product_id: number;
  funding_rate_x18: string;
  update_time: number;
}

export type IndexerServerFundingRateResponse = IndexerServerFundingRate;

// Map of productId -> IndexerServerFundingRate
export type IndexerServerFundingRatesResponse = Record<
  string,
  IndexerServerFundingRate
>;

export interface IndexerServerPerpPrices {
  product_id: number;
  index_price_x18: string;
  mark_price_x18: string;
  update_time: number;
}

export type IndexerServerPriceResponse = IndexerServerPerpPrices;

// Map of productId -> IndexerServerPerpPrices
export type IndexerServerPerpPricesResponse = Record<
  string,
  IndexerServerPerpPrices
>;

export interface IndexerServerOraclePricesResponse {
  prices: IndexerServerOraclePrice[];
}

export interface IndexerServerCandlesticksResponse {
  candlesticks: IndexerServerCandlestick[];
}

export interface IndexerServerProductsResponse {
  products: IndexerServerProductSnapshot[];
  txs: IndexerServerTx[];
}

// Map of productId -> IndexerServerProductSnapshot
export type IndexerServerMultiProductsResponse = Record<
  string,
  IndexerServerProductSnapshot
>;

export interface IndexerServerEventsResponse {
  events: IndexerServerEvent[];
  txs: IndexerServerTx[];
}

export interface IndexerServerOrdersResponse {
  orders: IndexerServerOrder[];
}

export interface IndexerServerMatchEventsResponse {
  matches: IndexerServerMatchEvent[];
  txs: IndexerServerTx[];
}

export interface IndexerServerUsdcPriceResponse {
  price_x18: string;
}

export interface IndexerServerLinkedSignerResponse {
  total_tx_limit: string;
  remaining_tx: string;
  wait_time: string;
  signer: string;
}

export interface IndexerServerMarketSnapshotsResponse {
  snapshots: IndexerServerMarketSnapshot[];
}

// Response
export interface IndexerServerQueryResponseByType {
  summary: IndexerServerSummaryResponse;
  rewards: IndexerServerRewardsResponse;
  referral_code: IndexerServerReferralCodeResponse;
  funding_rate: IndexerServerFundingRateResponse;
  funding_rates: IndexerServerFundingRatesResponse;
  price: IndexerServerPriceResponse;
  perp_prices: IndexerServerPerpPricesResponse;
  oracle_price: IndexerServerOraclePricesResponse;
  candlesticks: IndexerServerCandlesticksResponse;
  products: IndexerServerProductsResponse;
  product_snapshots: IndexerServerMultiProductsResponse;
  events: IndexerServerEventsResponse;
  orders: IndexerServerOrdersResponse;
  matches: IndexerServerMatchEventsResponse;
  usdc_price: IndexerServerUsdcPriceResponse;
  linked_signer_rate_limit: IndexerServerLinkedSignerResponse;
  market_snapshots: IndexerServerMarketSnapshotsResponse;
}
