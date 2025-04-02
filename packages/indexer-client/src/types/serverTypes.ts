import {
  EIP712LeaderboardAuthenticationValues,
  SignedTx,
} from '@vertex-protocol/contracts';
import { IndexerEventType } from './IndexerEventType';
import { IndexerLeaderboardRankType } from './IndexerLeaderboardType';
import {
  IndexerServerCandlestick,
  IndexerServerEvent,
  IndexerServerFoundationTakerRewardsWeek,
  IndexerServerFoundationTokenIncentivesSnapshot,
  IndexerServerLeaderboardContest,
  IndexerServerLeaderboardPosition,
  IndexerServerLeaderboardRegistration,
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
  IndexerServerSnapshotsInterval,
  IndexerServerStakingV2PoolSnapshot,
  IndexerServerStakingV2Staker,
  IndexerServerTakerRewardsEpoch,
  IndexerServerTx,
  IndexerServerVrtxSupplySnapshot,
} from './serverModelTypes';
import { VertexWithdrawCollateralTx } from './VertexTx';

/**
 * Params
 */

export interface IndexerServerListSubaccountsParams {
  // Inclusive, defaults to 0
  start?: number;
  // Defaults to 100
  limit?: number;
  address?: string;
}

export interface IndexerServerMultiSubaccountSnapshotsParams {
  // Subaccount hex identifiers
  subaccounts: string[];
  timestamps: number[];
  // If not given, will return both isolated & non-iso balances
  isolated?: boolean;
}

export interface IndexerServerRewardsParams {
  address: string;
  // Inclusive, epochs are returned in descending order
  start?: number;
  limit?: number;
}

export type IndexerServerTakerRewardsParams = IndexerServerRewardsParams;

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

export type IndexerEdgeServerCandlesticksParams =
  IndexerServerCandlesticksParams;

export interface IndexerServerProductsParams {
  product_id: number;
  max_time?: number;
  limit: number;
  // submission_idx for pagination, inclusive
  idx?: string;
}

export interface IndexerServerMultiProductsParams {
  product_ids: number[];
  max_time: number[];
}

export interface IndexerServerEventsParams {
  subaccount?: string;
  product_ids?: number[];
  // If not given, will return both isolated & non-iso events
  isolated?: boolean;
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
  // If not given, will return both isolated & non-iso orders
  isolated?: boolean;
  // submission_idx for pagination, inclusive
  idx?: string;
}

export interface IndexerServerMatchEventsParams {
  subaccount?: string;
  product_ids?: number[];
  // If not given, will return both isolated & non-iso events
  isolated?: boolean;
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

export interface IndexerEdgeServerMarketSnapshotsParams {
  interval: IndexerServerMarketSnapshotInterval;
}

export interface IndexerServerInterestFundingParams {
  subaccount: string;
  product_ids: number[];
  // If not given, defaults to latest
  max_idx?: string;
  limit: number;
}

export interface IndexerServerClaimVrtxMerkleProofsParams {
  address: string;
}

export interface IndexerServerFoundationTakerRewardsParams {
  address: string;
}

export interface IndexerServerClaimFoundationRewardsMerkleProofsParams {
  address: string;
}

export interface IndexerServerBlastPointsParams {
  address: string;
}

export interface IndexerServerBlitzPointsParams {
  address: string;
}

export interface IndexerServerBlitzPointsLeaderboardParams {
  epoch: number;
  start?: number;
  limit?: number;
}

export interface IndexerServerBlitzInitialDropConditionsParams {
  address: string;
}

export interface IndexerServerSonicPointsParams {
  address: string;
}

export interface IndexerServerSonicPointsLeaderboardParams {
  start?: number;
  limit?: number;
}

export interface IndexerServerMakerStatisticsParams {
  product_id: number;
  epoch: number;
  interval: number;
}

export interface IndexerServerLeaderboardParams {
  contest_id: number;
  rank_type: IndexerLeaderboardRankType;
  start?: number | string;
  limit?: number | string;
}

export interface IndexerServerLeaderboardRankParams {
  subaccount: string;
  contest_ids: number[];
}

export interface IndexerServerLeaderboardContestsParams {
  contest_ids: number[];
}

export interface IndexerServerLeaderboardRegistrationParams {
  subaccount: string;
  contest_id: number;
  update_registration: SignedTx<EIP712LeaderboardAuthenticationValues> | null;
}

export interface IndexerServerFastWithdrawalSignatureParams {
  /**
   * The submission index of the WithdrawCollateral tx to be used for fast withdraw.
   */
  idx: number | string;
}

export interface IndexerServerStakingV2PoolSnapshotsParams {
  interval: IndexerServerSnapshotsInterval;
}

export interface IndexerServerStakingV2TopStakersParams {
  limit: number;
}

export interface IndexerServerVrtxSupplySnapshotsParams {
  interval: IndexerServerSnapshotsInterval;
}

export interface IndexerServerFoundationTokenIncentivesSnapshotsParams {
  interval: IndexerServerSnapshotsInterval;
}

// Request
export interface IndexerServerQueryRequestByType {
  account_snapshots: IndexerServerMultiSubaccountSnapshotsParams;
  foundation_rewards_merkle_proofs: IndexerServerClaimFoundationRewardsMerkleProofsParams;
  foundation_taker_rewards: IndexerServerFoundationTakerRewardsParams;
  blast_points: IndexerServerBlastPointsParams;
  blitz_points: IndexerServerBlitzPointsParams;
  blitz_points_leaderboard: IndexerServerBlitzPointsLeaderboardParams;
  sonic_points: IndexerServerSonicPointsParams;
  sonic_points_leaderboard: IndexerServerSonicPointsLeaderboardParams;
  candlesticks: IndexerServerCandlesticksParams;
  edge_candlesticks: IndexerEdgeServerCandlesticksParams;
  events: IndexerServerEventsParams;
  funding_rate: IndexerServerFundingRateParams;
  funding_rates: IndexerServerFundingRatesParams;
  initial_drop_conditions: IndexerServerBlitzInitialDropConditionsParams;
  interest_and_funding: IndexerServerInterestFundingParams;
  linked_signer_rate_limit: IndexerServerLinkedSignerParams;
  maker_statistics: IndexerServerMakerStatisticsParams;
  market_snapshots: IndexerServerMarketSnapshotsParams;
  edge_market_snapshots: IndexerEdgeServerMarketSnapshotsParams;
  matches: IndexerServerMatchEventsParams;
  oracle_price: IndexerServerOraclePricesParams;
  orders: IndexerServerOrdersParams;
  perp_prices: IndexerServerPerpPricesParams;
  price: IndexerServerPriceParams;
  product_snapshots: IndexerServerMultiProductsParams;
  products: IndexerServerProductsParams;
  referral_code: IndexerServerReferralCodeParams;
  rewards: IndexerServerRewardsParams;
  subaccounts: IndexerServerListSubaccountsParams;
  taker_rewards: IndexerServerTakerRewardsParams;
  usdc_price: Record<string, never>;
  vrtx_merkle_proofs: IndexerServerClaimVrtxMerkleProofsParams;
  leaderboard: IndexerServerLeaderboardParams;
  leaderboard_rank: IndexerServerLeaderboardRankParams;
  leaderboard_contests: IndexerServerLeaderboardContestsParams;
  leaderboard_registration: IndexerServerLeaderboardRegistrationParams;
  fast_withdrawal_signature: IndexerServerFastWithdrawalSignatureParams;
  staking_v2_top_stakers: IndexerServerStakingV2TopStakersParams;
  staking_v2_pool_snapshots: IndexerServerStakingV2PoolSnapshotsParams;
  vrtx_supply_snapshots: IndexerServerVrtxSupplySnapshotsParams;
  foundation_token_incentives_snapshots: IndexerServerFoundationTokenIncentivesSnapshotsParams;
}

export type IndexerServerQueryRequestType =
  keyof IndexerServerQueryRequestByType;

/**
 * Responses
 */

export interface IndexerServerListSubaccountsResponse {
  subaccounts: {
    id: string;
    // Hex of subaccount bytes
    subaccount: string;
  }[];
}

export interface IndexerServerMultiSubaccountSnapshotsResponse {
  // Map of subaccount hex -> timestamp requested -> latest events corresponding to each product
  snapshots: Record<string, Record<string, IndexerServerEvent[]>>;
}

export interface IndexerServerRewardsResponse {
  rewards: IndexerServerRewardsEpoch[];
  update_time: string;
  total_referrals: string;
}

export interface IndexerServerTakerRewardsResponse {
  taker_rewards: IndexerServerTakerRewardsEpoch[];
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

export type IndexerEdgeServerCandlesticksResponse =
  IndexerServerCandlesticksResponse;

export interface IndexerServerProductsResponse {
  products: IndexerServerProductSnapshot[];
  txs: IndexerServerTx[];
}

// Map of timestamp -> (productID -> IndexerServerProductSnapshot)
export type IndexerServerMultiProductsResponse = Record<
  string,
  Record<string, IndexerServerProductSnapshot>
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

export interface IndexerEdgeServerMarketSnapshotsResponse {
  snapshots: Record<number, IndexerServerMarketSnapshot[]>;
}

export interface IndexerServerInterestFundingResponse {
  interest_payments: IndexerServerProductPayment[];
  funding_payments: IndexerServerProductPayment[];
  next_idx: string;
}

export interface IndexerServerClaimVrtxMerkleProofsResponse {
  merkle_proofs: IndexerServerMerkleProof[];
}

export interface IndexerServerFoundationTakerRewardsResponse {
  foundation_taker_rewards: IndexerServerFoundationTakerRewardsWeek[];
  update_time: string;
}

export type IndexerServerClaimFoundationRewardsMerkleProofsResponse =
  IndexerServerClaimVrtxMerkleProofsResponse;

export interface IndexerServerBlitzPointsResponse {
  initial_points: string;
  trading_points: string;
  referral_points: string;
  maker_volumes: string;
  taker_volumes: string;
  users_referred: string;
  phase2_points: Array<{
    epoch: number;
    // in seconds
    start_time: string;
    period: string;
    trading_points: string;
    referral_points: string;
    taker_volumes: string;
    maker_volumes: string;
    rank: string;
  }>;
}

export interface IndexerServerBlitzPointsLeaderboardResponse {
  positions: Array<{
    address: string;
    trading_points: string;
    referral_points: string;
    rank: string;
    taker_volumes: string;
    maker_volumes: string;
  }>;
}

export interface IndexerServerBlitzInitialDropConditionsResponse {
  amount: string;
  deadline: string;
  account_value_reached: boolean;
  perp_trades_done: boolean;
  tweeted: boolean;
}

export interface IndexerServerBlastPointsResponse {
  points: string;
  gold: string;
}

export interface IndexerServerSonicPointsResponse {
  trading_points: string;
  referral_points: string;
  rank: string;
  users_referred: string;
  taker_volumes: string;
  maker_volumes: string;
}

export interface IndexerServerSonicPointsLeaderboardResponse {
  positions: Array<{
    address: string;
    trading_points: string;
    referral_points: string;
    rank: string;
    taker_volumes: string;
    maker_volumes: string;
  }>;
}

export interface IndexerServerMakerStatisticsResponse {
  reward_coefficient: string;
  makers: IndexerServerMaker[];
}

export interface IndexerServerLeaderboardResponse {
  positions: IndexerServerLeaderboardPosition[];
}

export interface IndexerServerLeaderboardRegistrationResponse {
  // For non-tiered contests, null if the user is not registered for the provided contestId.
  // For tiered contests (i.e., related contests), null if the user is not registered for any of the contests in the tier group.
  registration: IndexerServerLeaderboardRegistration | null;
}

export interface IndexerServerLeaderboardRankResponse {
  // If the subaccount is not eligible for a given contest, it would not be included in the response.
  // contestId -> IndexerServerLeaderboardPosition
  positions: Record<string, IndexerServerLeaderboardPosition>;
}

export interface IndexerServerLeaderboardContestsResponse {
  contests: IndexerServerLeaderboardContest[];
}

export interface IndexerServerFastWithdrawalSignatureResponse {
  idx: string;
  tx: VertexWithdrawCollateralTx['withdraw_collateral'];
  tx_bytes: string;
  signatures: string[];
}

export interface IndexerServerStakingV2TopStakersResponse {
  stakers: IndexerServerStakingV2Staker[];
}

export interface IndexerServerStakingV2PoolSnapshotsResponse {
  snapshots: IndexerServerStakingV2PoolSnapshot[];
}

export interface IndexerServerVrtxSupplySnapshotsResponse {
  snapshots: IndexerServerVrtxSupplySnapshot[];
}

export interface IndexerServerFoundationTokenIncentivesSnapshotsResponse {
  snapshots: IndexerServerFoundationTokenIncentivesSnapshot[];
}

// Response
export interface IndexerServerQueryResponseByType {
  account_snapshots: IndexerServerMultiSubaccountSnapshotsResponse;
  foundation_rewards_merkle_proofs: IndexerServerClaimFoundationRewardsMerkleProofsResponse;
  foundation_taker_rewards: IndexerServerFoundationTakerRewardsResponse;
  blast_points: IndexerServerBlastPointsResponse;
  blitz_points: IndexerServerBlitzPointsResponse;
  blitz_points_leaderboard: IndexerServerBlitzPointsLeaderboardResponse;
  sonic_points: IndexerServerSonicPointsResponse;
  sonic_points_leaderboard: IndexerServerSonicPointsLeaderboardResponse;
  candlesticks: IndexerServerCandlesticksResponse;
  edge_candlesticks: IndexerEdgeServerCandlesticksResponse;
  events: IndexerServerEventsResponse;
  funding_rate: IndexerServerFundingRateResponse;
  funding_rates: IndexerServerFundingRatesResponse;
  initial_drop_conditions: IndexerServerBlitzInitialDropConditionsResponse;
  interest_and_funding: IndexerServerInterestFundingResponse;
  linked_signer_rate_limit: IndexerServerLinkedSignerResponse;
  maker_statistics: IndexerServerMakerStatisticsResponse;
  market_snapshots: IndexerServerMarketSnapshotsResponse;
  edge_market_snapshots: IndexerEdgeServerMarketSnapshotsResponse;
  matches: IndexerServerMatchEventsResponse;
  oracle_price: IndexerServerOraclePricesResponse;
  orders: IndexerServerOrdersResponse;
  perp_prices: IndexerServerPerpPricesResponse;
  price: IndexerServerPriceResponse;
  product_snapshots: IndexerServerMultiProductsResponse;
  products: IndexerServerProductsResponse;
  referral_code: IndexerServerReferralCodeResponse;
  rewards: IndexerServerRewardsResponse;
  subaccounts: IndexerServerListSubaccountsResponse;
  taker_rewards: IndexerServerTakerRewardsResponse;
  usdc_price: IndexerServerUsdcPriceResponse;
  vrtx_merkle_proofs: IndexerServerClaimVrtxMerkleProofsResponse;
  leaderboard: IndexerServerLeaderboardResponse;
  leaderboard_rank: IndexerServerLeaderboardRankResponse;
  leaderboard_contests: IndexerServerLeaderboardContestsResponse;
  leaderboard_registration: IndexerServerLeaderboardRegistrationResponse;
  fast_withdrawal_signature: IndexerServerFastWithdrawalSignatureResponse;
  staking_v2_top_stakers: IndexerServerStakingV2TopStakersResponse;
  staking_v2_pool_snapshots: IndexerServerStakingV2PoolSnapshotsResponse;
  vrtx_supply_snapshots: IndexerServerVrtxSupplySnapshotsResponse;
  foundation_token_incentives_snapshots: IndexerServerFoundationTokenIncentivesSnapshotsResponse;
}
