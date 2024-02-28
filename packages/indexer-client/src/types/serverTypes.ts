import { IndexerEventType } from './IndexerEventType';
import {
  IndexerServerArbRewardsWeek,
  IndexerServerCandlestick,
  IndexerServerEvent,
  IndexerServerMaker,
  IndexerServerMarketSnapshot,
  IndexerServerMarketSnapshotInterval,
  IndexerServerMatchEvent,
  IndexerServerMerkleProof,
  IndexerServerOraclePrice,
  IndexerServerOrder,
  IndexerServerProductPayment,
  IndexerServerProductSnapshot,
  IndexerServerRewardsEpoch,
  IndexerServerTakerRewardsEpoch,
  IndexerServerTx,
} from './serverModelTypes';

/**
 * Params
 */

export interface IndexerServerQueryListSubaccountsParams {
  // Inclusive, defaults to 0
  start?: number;
  // Defaults to 100
  limit?: number;
  address?: string;
}

export interface IndexerServerQueryMultiSubaccountSnapshotsParams {
  // Subaccount hex identifiers
  subaccounts: string[];
  timestamps: number[];
}

export interface IndexerServerQueryRewardsParams {
  address: string;
  // Inclusive, epochs are returned in descending order
  start?: number;
  limit?: number;
}

export type IndexerServerQueryTakerRewardsParams =
  IndexerServerQueryRewardsParams;

export interface IndexerServerQueryReferralCodeParams {
  subaccount: string;
}

export interface IndexerServerQueryFundingRateParams {
  product_id: number;
}

export interface IndexerServerQueryFundingRatesParams {
  product_ids: number[];
}

export interface IndexerServerQueryPriceParams {
  product_id: number;
}

export interface IndexerServerQueryPerpPricesParams {
  product_ids: number[];
}

export interface IndexerServerQueryOraclePricesParams {
  product_ids: number[];
}

export interface IndexerServerQueryCandlesticksParams {
  product_id: number;
  granularity: number;
  // Seconds
  max_time?: number;
  limit: number;
}

export interface IndexerServerQueryProductsParams {
  product_id: number;
  max_time?: number;
  limit: number;
  // submission_idx for pagination, inclusive
  idx?: string;
}

export interface IndexerServerQueryMultiProductsParams {
  product_ids: number[];
  max_time?: number;
}

export interface IndexerServerQueryEventsParams {
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

export interface IndexerServerQueryOrdersParams {
  subaccount?: string;
  product_ids?: number[];
  digests?: string[];
  max_time?: number;
  limit?: number;
  // submission_idx for pagination, inclusive
  idx?: string;
}

export interface IndexerServerQueryMatchEventsParams {
  subaccount?: string;
  product_ids?: number[];
  max_time?: number;
  limit: number;
  // submission_idx for pagination, inclusive
  idx?: string;
}

export interface IndexerServerQueryLinkedSignerParams {
  subaccount: string;
}

export interface IndexerServerQueryMarketSnapshotsParams {
  interval: IndexerServerMarketSnapshotInterval;
  // Defaults to all
  product_ids?: number[];
}

export interface IndexerServerQueryInterestFundingParams {
  subaccount: string;
  product_ids: number[];
  // If not given, defaults to latest
  max_idx?: string;
  limit: number;
}

export interface IndexerServerQueryClaimVrtxMerkleProofsParams {
  address: string;
}

export interface IndexerServerQueryArbRewardsParams {
  address: string;
}

export interface IndexerServerQueryClaimArbMerkleProofsParams {
  address: string;
}

export interface IndexerServerQueryMakerStatisticsParams {
  product_id: number;
  epoch: number;
  interval: number;
}

// Request
export interface IndexerServerQueryRequestByType {
  account_snapshots: IndexerServerQueryMultiSubaccountSnapshotsParams;
  arb_merkle_proofs: IndexerServerQueryClaimArbMerkleProofsParams;
  arb_rewards: IndexerServerQueryArbRewardsParams;
  candlesticks: IndexerServerQueryCandlesticksParams;
  events: IndexerServerQueryEventsParams;
  funding_rate: IndexerServerQueryFundingRateParams;
  funding_rates: IndexerServerQueryFundingRatesParams;
  interest_and_funding: IndexerServerQueryInterestFundingParams;
  linked_signer_rate_limit: IndexerServerQueryLinkedSignerParams;
  maker_statistics: IndexerServerQueryMakerStatisticsParams;
  market_snapshots: IndexerServerQueryMarketSnapshotsParams;
  matches: IndexerServerQueryMatchEventsParams;
  oracle_price: IndexerServerQueryOraclePricesParams;
  orders: IndexerServerQueryOrdersParams;
  perp_prices: IndexerServerQueryPerpPricesParams;
  price: IndexerServerQueryPriceParams;
  product_snapshots: IndexerServerQueryMultiProductsParams;
  products: IndexerServerQueryProductsParams;
  referral_code: IndexerServerQueryReferralCodeParams;
  rewards: IndexerServerQueryRewardsParams;
  subaccounts: IndexerServerQueryListSubaccountsParams;
  taker_rewards: IndexerServerQueryTakerRewardsParams;
  usdc_price: Record<string, never>;
  vrtx_merkle_proofs: IndexerServerQueryClaimVrtxMerkleProofsParams;
}

export type IndexerServerQueryRequestType =
  keyof IndexerServerQueryRequestByType;

/**
 * Responses
 */

export interface IndexerServerQueryListSubaccountsResponse {
  subaccounts: {
    id: string;
    // Hex of subaccount bytes
    subaccount: string;
  }[];
}

export interface IndexerServerQueryMultiSubaccountSnapshotsResponse {
  // Map of subaccount hex -> timestamp requested -> latest events corresponding to each product
  snapshots: Record<string, Record<string, IndexerServerEvent[]>>;
}

export interface IndexerServerQueryRewardsResponse {
  rewards: IndexerServerRewardsEpoch[];
  update_time: string;
  total_referrals: string;
}

export interface IndexerServerQueryTakerRewardsResponse {
  taker_rewards: IndexerServerTakerRewardsEpoch[];
  update_time: string;
  total_referrals: string;
}

export interface IndexerServerQueryReferralCodeResponse {
  referral_code: string | null;
}

export interface IndexerServerFundingRate {
  product_id: number;
  funding_rate_x18: string;
  update_time: number;
}

export type IndexerServerQueryFundingRateResponse = IndexerServerFundingRate;

// Map of productId -> IndexerServerFundingRate
export type IndexerServerQueryFundingRatesResponse = Record<
  string,
  IndexerServerFundingRate
>;

export interface IndexerServerPerpPrices {
  product_id: number;
  index_price_x18: string;
  mark_price_x18: string;
  update_time: number;
}

export type IndexerServerQueryPriceResponse = IndexerServerPerpPrices;

// Map of productId -> IndexerServerPerpPrices
export type IndexerServerQueryPerpPricesResponse = Record<
  string,
  IndexerServerPerpPrices
>;

export interface IndexerServerQueryOraclePricesResponse {
  prices: IndexerServerOraclePrice[];
}

export interface IndexerServerQueryCandlesticksResponse {
  candlesticks: IndexerServerCandlestick[];
}

export interface IndexerServerQueryProductsResponse {
  products: IndexerServerProductSnapshot[];
  txs: IndexerServerTx[];
}

// Map of productId -> IndexerServerProductSnapshot
export type IndexerServerQueryMultiProductsResponse = Record<
  string,
  IndexerServerProductSnapshot
>;

export interface IndexerServerQueryEventsResponse {
  events: IndexerServerEvent[];
  txs: IndexerServerTx[];
}

export interface IndexerServerQueryOrdersResponse {
  orders: IndexerServerOrder[];
}

export interface IndexerServerQueryMatchEventsResponse {
  matches: IndexerServerMatchEvent[];
  txs: IndexerServerTx[];
}

export interface IndexerServerQueryUsdcPriceResponse {
  price_x18: string;
}

export interface IndexerServerQueryLinkedSignerResponse {
  total_tx_limit: string;
  remaining_tx: string;
  wait_time: string;
  signer: string;
}

export interface IndexerServerQueryMarketSnapshotsResponse {
  snapshots: IndexerServerMarketSnapshot[];
}

export interface IndexerServerQueryInterestFundingResponse {
  interest_payments: IndexerServerProductPayment[];
  funding_payments: IndexerServerProductPayment[];
  next_idx: string;
}

export interface IndexerServerQueryClaimVrtxMerkleProofsResponse {
  merkle_proofs: IndexerServerMerkleProof[];
}

export interface IndexerServerQueryArbRewardsResponse {
  arb_rewards: IndexerServerArbRewardsWeek[];
  update_time: string;
}

export type IndexerServerQueryClaimArbMerkleProofsResponse =
  IndexerServerQueryClaimVrtxMerkleProofsResponse;

export interface IndexerServerQueryMakerStatisticsResponse {
  reward_coefficient: string;
  makers: IndexerServerMaker[];
}

// Response
export interface IndexerServerQueryResponseByType {
  account_snapshots: IndexerServerQueryMultiSubaccountSnapshotsResponse;
  arb_merkle_proofs: IndexerServerQueryClaimArbMerkleProofsResponse;
  arb_rewards: IndexerServerQueryArbRewardsResponse;
  candlesticks: IndexerServerQueryCandlesticksResponse;
  events: IndexerServerQueryEventsResponse;
  funding_rate: IndexerServerQueryFundingRateResponse;
  funding_rates: IndexerServerQueryFundingRatesResponse;
  interest_and_funding: IndexerServerQueryInterestFundingResponse;
  linked_signer_rate_limit: IndexerServerQueryLinkedSignerResponse;
  maker_statistics: IndexerServerQueryMakerStatisticsResponse;
  market_snapshots: IndexerServerQueryMarketSnapshotsResponse;
  matches: IndexerServerQueryMatchEventsResponse;
  oracle_price: IndexerServerQueryOraclePricesResponse;
  orders: IndexerServerQueryOrdersResponse;
  perp_prices: IndexerServerQueryPerpPricesResponse;
  price: IndexerServerQueryPriceResponse;
  product_snapshots: IndexerServerQueryMultiProductsResponse;
  products: IndexerServerQueryProductsResponse;
  referral_code: IndexerServerQueryReferralCodeResponse;
  rewards: IndexerServerQueryRewardsResponse;
  subaccounts: IndexerServerQueryListSubaccountsResponse;
  taker_rewards: IndexerServerQueryTakerRewardsResponse;
  usdc_price: IndexerServerQueryUsdcPriceResponse;
  vrtx_merkle_proofs: IndexerServerQueryClaimVrtxMerkleProofsResponse;
}
