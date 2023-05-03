import {
  IndexerServerCandlestick,
  IndexerServerEvent,
  IndexerServerMatchEvent,
  IndexerServerOrder,
  IndexerServerProductSnapshot,
  IndexerServerTx,
} from './serverModelTypes';
import { IndexerEventType } from './IndexerEventType';

/**
 * Params
 */
export interface IndexerServerSummaryParams {
  subaccount: string;
  timestamp: number;
}

export interface IndexerServerRewardsParams {
  address: string;
}

export interface IndexerServerFundingRateParams {
  product_id: number;
}

export interface IndexerServerPriceParams {
  product_id: number;
}

export interface IndexerServerOraclePriceParams {
  product_id: number;
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

export interface IndexerServerEventsParams {
  subaccount?: string;
  product_ids?: number[];
  event_types?: IndexerEventType[];
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

// Request
export interface IndexerServerQueryRequestByType {
  summary: IndexerServerSummaryParams;
  rewards: IndexerServerRewardsParams;
  funding_rate: IndexerServerFundingRateParams;
  price: IndexerServerPriceParams;
  oracle_price: IndexerServerOraclePriceParams;
  candlesticks: IndexerServerCandlesticksParams;
  products: IndexerServerProductsParams;
  events: IndexerServerEventsParams;
  orders: IndexerServerOrdersParams;
  matches: IndexerServerMatchEventsParams;
  usdc_price: Record<string, never>;
}

export type IndexerServerQueryRequestType =
  keyof IndexerServerQueryRequestByType;

/**
 * Responses
 */
export interface IndexerServerSummaryResponse {
  events: IndexerServerEvent[];
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
  // Per product ID
  address_rewards: IndexerServerSubaccountRewardsForProduct[];
  global_rewards: IndexerServerGlobalRewardsForProduct[];
}

export interface IndexerServerRewardsResponse {
  rewards: IndexerServerRewardEpoch[];
  update_time: string;
}

export interface IndexerServerFundingRateResponse {
  product_id: number;
  funding_rate_x18: string;
  update_time: number;
}

export interface IndexerServerPriceResponse {
  product_id: number;
  index_price_x18: string;
  mark_price_x18: string;
  update_time: number;
}

export interface IndexerServerOraclePriceResponse {
  product_id: number;
  oracle_price_x18: string;
  update_time: number;
}

export interface IndexerServerCandlesticksResponse {
  candlesticks: IndexerServerCandlestick[];
}

export interface IndexerServerProductsResponse {
  products: IndexerServerProductSnapshot[];
  txs: IndexerServerTx[];
}

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

// Response
export interface IndexerServerQueryResponseByType {
  summary: IndexerServerSummaryResponse;
  rewards: IndexerServerRewardsResponse;
  funding_rate: IndexerServerFundingRateResponse;
  price: IndexerServerPriceResponse;
  oracle_price: IndexerServerOraclePriceResponse;
  candlesticks: IndexerServerCandlesticksResponse;
  products: IndexerServerProductsResponse;
  events: IndexerServerEventsResponse;
  orders: IndexerServerOrdersResponse;
  matches: IndexerServerMatchEventsResponse;
  usdc_price: IndexerServerUsdcPriceResponse;
}
