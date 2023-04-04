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
  subaccount: string;
}

export interface IndexerServerFundingRateParams {
  product_id: number;
}

export interface IndexerServerPriceParams {
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
  candlesticks: IndexerServerCandlesticksParams;
  products: IndexerServerProductsParams;
  events: IndexerServerEventsParams;
  orders: IndexerServerOrdersParams;
  matches: IndexerServerMatchEventsParams;
}

export type IndexerServerQueryRequestType =
  keyof IndexerServerQueryRequestByType;

/**
 * Responses
 */
export interface IndexerServerSummaryResponse {
  events: IndexerServerEvent[];
}

export interface IndexerServerRewardEpoch {
  epoch: number;
  start_time: string;
  period: string;
  // Totals
  epoch_maker_tokens: string;
  epoch_taker_tokens: string;
  // For the subaccount
  subaccount_maker_tokens: string;
  subaccount_taker_tokens: string;
  update_time: string;
}

export interface IndexerServerRewardsResponse {
  rewards: IndexerServerRewardEpoch[];
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

// Response
export interface IndexerServerQueryResponseByType {
  summary: IndexerServerSummaryResponse;
  rewards: IndexerServerRewardsResponse;
  funding_rate: IndexerServerFundingRateResponse;
  price: IndexerServerPriceResponse;
  candlesticks: IndexerServerCandlesticksResponse;
  products: IndexerServerProductsResponse;
  events: IndexerServerEventsResponse;
  orders: IndexerServerOrdersResponse;
  matches: IndexerServerMatchEventsResponse;
}
