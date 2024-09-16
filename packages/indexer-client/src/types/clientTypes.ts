import {
  EIP712OrderValues,
  Market,
  OrderExpirationType,
  PerpBalance,
  PerpMarket,
  ProductEngineType,
  SpotBalance,
  SpotMarket,
  Subaccount,
} from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';
import { CandlestickPeriod } from './CandlestickPeriod';
import { IndexerEventType } from './IndexerEventType';
import { IndexerLeaderboardRankType } from './IndexerLeaderboardType';
import { IndexerVrtxTokenInfoType } from './IndexerVrtxTokenInfoType';
import {
  IndexerServerClaimFoundationRewardsMerkleProofsParams,
  IndexerServerClaimVrtxMerkleProofsParams,
  IndexerServerFastWithdrawalSignatureParams,
  IndexerServerListSubaccountsParams,
} from './serverTypes';
import { VertexTx, VertexWithdrawCollateralTx } from './VertexTx';

/**
 * Base types
 */

export type IndexerSpotBalance = Omit<SpotBalance, 'healthContributions'>;

export type IndexerPerpBalance = Omit<PerpBalance, 'healthContributions'>;

export interface IndexerEventSpotStateSnapshot {
  type: ProductEngineType.SPOT;
  preBalance: IndexerSpotBalance;
  postBalance: IndexerSpotBalance;
  market: SpotMarket;
}

export interface IndexerEventPerpStateSnapshot {
  type: ProductEngineType.PERP;
  preBalance: IndexerPerpBalance;
  postBalance: IndexerPerpBalance;
  market: PerpMarket;
}

export type IndexerEventBalanceStateSnapshot =
  | IndexerEventSpotStateSnapshot
  | IndexerEventPerpStateSnapshot;

export interface IndexerBalanceTrackedVars {
  netInterestUnrealized: BigDecimal;
  netInterestCumulative: BigDecimal;
  netFundingUnrealized: BigDecimal;
  netFundingCumulative: BigDecimal;
  netEntryUnrealized: BigDecimal;
  netEntryCumulative: BigDecimal;
  netEntryLpUnrealized: BigDecimal;
  netEntryLpCumulative: BigDecimal;
}

/**
 * List subaccounts
 */

export type ListIndexerSubaccountsParams = IndexerServerListSubaccountsParams;

export type ListIndexerSubaccountsResponse = ({
  hexId: string;
} & Subaccount)[];

/**
 * Subaccount snapshots
 */

export interface GetIndexerMultiSubaccountSnapshotsParams {
  subaccounts: Subaccount[];
  // A series of timestamps for which to return a summary of each subaccount
  timestamps: number[];
}

export interface IndexerSnapshotBalance {
  productId: number;
  state: IndexerEventBalanceStateSnapshot;
  trackedVars: IndexerBalanceTrackedVars;
}

export interface IndexerSubaccountSnapshot {
  timestamp: BigDecimal;
  balances: IndexerSnapshotBalance[];
}

export interface GetIndexerMultiSubaccountSnapshotsResponse {
  // Utility for retrieving a subaccount's hex ID, in the same order as the request params
  subaccountHexIds: string[];
  // Map of subaccount hex -> timestamp requested -> summary for that time
  snapshots: Record<string, Record<string, IndexerSubaccountSnapshot>>;
}

/**
 * Perp prices
 */

export interface GetIndexerPerpPricesParams {
  productId: number;
}

export interface IndexerPerpPrices {
  productId: number;
  indexPrice: BigDecimal;
  markPrice: BigDecimal;
  // Seconds
  updateTime: BigDecimal;
}

export type GetIndexerPerpPricesResponse = IndexerPerpPrices;

export interface GetIndexerMultiProductPerpPricesParams {
  productIds: number[];
}

// Map of productId -> IndexerPerpPrices
export type GetIndexerMultiProductPerpPricesResponse = Record<
  number,
  IndexerPerpPrices
>;

/**
 * Oracle prices
 */

export interface GetIndexerOraclePricesParams {
  productIds: number[];
}

export interface IndexerOraclePrice {
  productId: number;
  oraclePrice: BigDecimal;
  // Seconds
  updateTime: BigDecimal;
}

export type GetIndexerOraclePricesResponse = IndexerOraclePrice[];

/**
 * Funding rates
 */

export interface GetIndexerFundingRateParams {
  productId: number;
}

export interface IndexerFundingRate {
  productId: number;
  fundingRate: BigDecimal;
  // Seconds
  updateTime: BigDecimal;
}

export type GetIndexerFundingRateResponse = IndexerFundingRate;

export interface GetIndexerMultiProductFundingRatesParams {
  productIds: number[];
}

// Map of productId -> IndexerFundingRate
export type GetIndexerMultiProductFundingRatesResponse = Record<
  number,
  IndexerFundingRate
>;

/**
 * Candlesticks
 */

export interface GetIndexerCandlesticksParams {
  productId: number;
  period: CandlestickPeriod;
  // Seconds
  maxTimeInclusive?: number;
  limit: number;
}

// Semi-Tradingview compatible bars
export interface Candlestick {
  // In SECONDS, for TV compat, this needs to be in millis
  time: BigDecimal;
  open: BigDecimal;
  high: BigDecimal;
  low: BigDecimal;
  close: BigDecimal;
  volume: BigDecimal;
}

export type GetIndexerCandlesticksResponse = Candlestick[];

/**
 * Product snapshots
 */

export interface GetIndexerProductSnapshotsParams {
  // Max submission index, inclusive
  startCursor?: string;
  productId: number;
  maxTimestampInclusive?: number;
  limit: number;
}

export interface IndexerProductSnapshot extends Market {
  submissionIndex: string;
}

export type GetIndexerProductSnapshotsResponse = IndexerProductSnapshot[];

export interface GetIndexerMultiProductSnapshotsParams {
  productIds: number[];
  maxTimestampInclusive?: number[];
}

// Map of timestamp -> (productId -> IndexerProductSnapshot)
export type GetIndexerMultiProductSnapshotsResponse = Record<
  string,
  Record<number, IndexerProductSnapshot>
>;

/**
 * Market snapshots
 */

export interface GetIndexerMarketSnapshotsParams {
  // Defaults to all
  productIds?: number[];
  // Currently accepts all integers, in seconds
  granularity: number;
  // Seconds
  maxTimeInclusive?: number;
  limit: number;
}

export interface IndexerMarketSnapshot {
  timestamp: BigDecimal;
  cumulativeUsers: BigDecimal;
  dailyActiveUsers: BigDecimal;
  tvl: BigDecimal;
  cumulativeVolumes: Record<number, BigDecimal>;
  cumulativeTakerFees: Record<number, BigDecimal>;
  cumulativeSequencerFees: Record<number, BigDecimal>;
  cumulativeMakerFees: Record<number, BigDecimal>;
  cumulativeTrades: Record<number, BigDecimal>;
  cumulativeLiquidationAmounts: Record<number, BigDecimal>;
  openInterests: Record<number, BigDecimal>;
  totalDeposits: Record<number, BigDecimal>;
  totalBorrows: Record<number, BigDecimal>;
  fundingRates: Record<number, BigDecimal>;
  depositRates: Record<number, BigDecimal>;
  borrowRates: Record<number, BigDecimal>;
}

export type GetIndexerMarketSnapshotsResponse = IndexerMarketSnapshot[];

/**
 * Events
 */

// There can be multiple events per tx, this allows a limit depending on usecase
export type GetIndexerEventsLimitType = 'events' | 'txs';

export interface GetIndexerEventsParams {
  // Max submission index, inclusive
  startCursor?: string;
  subaccount?: Subaccount;
  productIds?: number[];
  eventTypes?: IndexerEventType[];
  maxTimestampInclusive?: number;
  // Descending order for idx (time), defaults to true
  desc?: boolean;
  limit?: {
    type: GetIndexerEventsLimitType;
    value: number;
  };
}

export interface IndexerEvent<
  TStateType extends IndexerEventBalanceStateSnapshot = IndexerEventBalanceStateSnapshot,
> {
  subaccount: string;
  productId: number;
  submissionIndex: string;
  eventType: IndexerEventType;
  state: TStateType;
  trackedVars: IndexerBalanceTrackedVars;
}

export interface IndexerEventWithTx<
  TStateType extends IndexerEventBalanceStateSnapshot = IndexerEventBalanceStateSnapshot,
> extends IndexerEvent<TStateType> {
  timestamp: BigDecimal;
  tx: VertexTx;
}

export type GetIndexerEventsResponse = IndexerEventWithTx[];

/**
 * Historical orders
 */

export interface GetIndexerOrdersParams {
  // Max submission index, inclusive
  startCursor?: string;
  subaccount?: Subaccount;
  minTimestampInclusive?: number;
  maxTimestampInclusive?: number;
  limit?: number;
  productIds?: number[];
  digests?: string[];
}

export interface IndexerOrder {
  digest: string;
  subaccount: string;
  productId: number;
  submissionIndex: string;
  amount: BigDecimal;
  price: BigDecimal;
  // This includes the order type
  rawExpiration: BigDecimal;
  isReduceOnly: boolean;
  orderType: OrderExpirationType;
  expiration: number;
  nonce: BigDecimal;
  // Derived from the nonce
  recvTimeSeconds: number;
  // Fill amounts
  baseFilled: BigDecimal;
  // Includes fee
  quoteFilled: BigDecimal;
  // Includes sequencer fee
  totalFee: BigDecimal;
}

export type GetIndexerOrdersResponse = IndexerOrder[];

/**
 * Match events
 */

export interface GetIndexerMatchEventsParams {
  // When not given, will return all maker events
  subaccount?: Subaccount;
  productIds?: number[];
  maxTimestampInclusive?: number;
  limit: number;
  // Max submission index, inclusive
  startCursor?: string;
}

// There are 2 balance states per match event if the match is in a spot market, but only one if the match is in a perp market
export interface IndexerMatchEventBalances {
  base: IndexerSpotBalance | IndexerPerpBalance;
  quote?: IndexerSpotBalance;
}

export interface IndexerMatchEvent {
  productId: number;
  digest: string;
  order: EIP712OrderValues;
  baseFilled: BigDecimal;
  quoteFilled: BigDecimal;
  // Includes sequencer fee
  totalFee: BigDecimal;
  sequencerFee: BigDecimal;
  cumulativeBaseFilled: BigDecimal;
  cumulativeQuoteFilled: BigDecimal;
  cumulativeFee: BigDecimal;
  submissionIndex: string;
  timestamp: BigDecimal;
  // Tracked vars for the balance BEFORE this match event occurred
  preEventTrackedVars: Pick<
    IndexerBalanceTrackedVars,
    'netEntryCumulative' | 'netEntryUnrealized'
  >;
  preBalances: IndexerMatchEventBalances;
  postBalances: IndexerMatchEventBalances;
  tx: VertexTx;
}

export type GetIndexerMatchEventsResponse = IndexerMatchEvent[];

/**
 * Quote price
 */

export interface GetIndexerQuotePriceResponse {
  price: BigDecimal;
}

/**
 * Linked Signer
 */

export interface GetIndexerLinkedSignerParams {
  subaccount: Subaccount;
}

export interface GetIndexerLinkedSignerResponse {
  totalTxLimit: BigDecimal;
  remainingTxs: BigDecimal;
  // If remainingTxs is 0, this is the time until the next link signer tx can be sent
  waitTimeUntilNextTx: BigDecimal;
  // If zero address, none is configured
  signer: string;
}

/**
 * Interest / funding payments
 */

export interface GetIndexerInterestFundingPaymentsParams {
  subaccount: Subaccount;
  productIds: number[];
  limit: number;
  // Max submission index, inclusive
  startCursor?: string;
}

export interface IndexerProductPayment {
  productId: number;
  submissionIndex: string;
  timestamp: BigDecimal;
  paymentAmount: BigDecimal;
  // For spots: previous spot balance at the moment of payment (exclusive of `paymentAmount`).
  // For perps: previous perp balance at the moment of payment + amount of perps locked in LPs (exclusive of `paymentAmount`).
  balanceAmount: BigDecimal;
  // Represents the annually interest rate for spots and annually funding rate for perps.
  annualPaymentRate: BigDecimal;
  oraclePrice: BigDecimal;
}

export interface GetIndexerInterestFundingPaymentsResponse {
  interestPayments: IndexerProductPayment[];
  fundingPayments: IndexerProductPayment[];
  nextCursor: string | null;
}

/**
 * VRTX rewards
 */

export interface GetIndexerRewardsParams {
  address: string;
  // Inclusive, epochs are returned in descending order
  start?: number;
  limit?: number;
}

export type GetIndexerTakerRewardsParams = GetIndexerRewardsParams;

export interface IndexerSubaccountRewardsForProduct {
  productId: number;
  qScore: BigDecimal;
  sumQMin: BigDecimal;
  uptime: number;
  makerVolume: BigDecimal;
  takerVolume: BigDecimal;
  makerFee: BigDecimal;
  takerFee: BigDecimal;
  makerTokens: BigDecimal;
  takerTokens: BigDecimal;
  takerReferralTokens: BigDecimal;
  rebates: BigDecimal;
}

export interface IndexerGlobalRewardsForProduct {
  productId: number;
  rewardCoefficient: BigDecimal;
  qScores: BigDecimal;
  makerVolumes: BigDecimal;
  takerVolumes: BigDecimal;
  makerFees: BigDecimal;
  takerFees: BigDecimal;
  makerTokens: BigDecimal;
  takerTokens: BigDecimal;
}

export interface IndexerRewardsEpoch {
  epoch: number;
  startTime: BigDecimal;
  period: BigDecimal;
  numEligibleAddresses: number;
  addressRewards: IndexerSubaccountRewardsForProduct[];
  globalRewards: IndexerGlobalRewardsForProduct[];
}

export interface GetIndexerRewardsResponse {
  epochs: IndexerRewardsEpoch[];
  updateTime: BigDecimal;
  totalReferrals: number;
}

export interface IndexerTakerRewardsEpoch {
  epoch: number;
  takerTokens: BigDecimal;
  takerReferralTokens: BigDecimal;
}

export interface GetIndexerTakerRewardsResponse {
  epochs: IndexerTakerRewardsEpoch[];
  updateTime: BigDecimal;
  totalReferrals: number;
}

/**
 * Referral code
 */

export interface GetIndexerReferralCodeParams {
  subaccount: Subaccount;
}

export interface GetIndexerReferralCodeResponse {
  referralCode: string | null;
}

/**
 * VRTX claim
 */

export interface IndexerMerkleProof {
  proof: string[];
  totalAmount: BigDecimal;
}

export type GetIndexerClaimVrtxMerkleProofsParams =
  IndexerServerClaimVrtxMerkleProofsParams;

export type GetIndexerClaimVrtxMerkleProofsResponse = IndexerMerkleProof[];

/**
 * Arb Rewards
 */
export interface GetIndexerFoundationTakerRewardsParams {
  address: string;
}

export type IndexerSubaccountFoundationTakerRewardsForProduct = Pick<
  IndexerSubaccountRewardsForProduct,
  'productId' | 'takerVolume' | 'takerFee' | 'takerTokens'
>;

export type IndexerFoundationTakerGlobalRewardsForProduct = Pick<
  IndexerGlobalRewardsForProduct,
  'productId' | 'takerFees' | 'takerTokens' | 'takerVolumes'
>;

export interface IndexerFoundationTakerRewardsWeek {
  week: number;
  startTime: BigDecimal;
  period: BigDecimal;
  addressRewards: IndexerSubaccountFoundationTakerRewardsForProduct[];
  globalRewards: IndexerFoundationTakerGlobalRewardsForProduct[];
}

export interface GetIndexerFoundationTakerRewardsResponse {
  weeks: IndexerFoundationTakerRewardsWeek[];
  updateTime: BigDecimal;
}

export type GetIndexerClaimFoundationRewardsMerkleProofsParams =
  IndexerServerClaimFoundationRewardsMerkleProofsParams;

export type GetIndexerClaimFoundationRewardsMerkleProofsResponse =
  GetIndexerClaimVrtxMerkleProofsResponse;

/**
 * Blitz points
 */

export interface GetIndexerBlitzPointsParams {
  address: string;
}

export interface IndexerBlitzPointsEpoch {
  epoch: number;
  // Start time of the epoch in seconds
  startTime: BigDecimal;
  // Period of the epoch in seconds
  period: BigDecimal;
  tradingPoints: BigDecimal;
  referralPoints: BigDecimal;
}

export interface GetIndexerBlitzPointsResponse {
  // Accrued points from the initial points drop
  initialPoints: BigDecimal;
  // Total accrued taker points from trading for phase 1 & phase 2
  tradingPoints: BigDecimal;
  // Total accrued points from referrals for phase 1 & phase 2
  referralPoints: BigDecimal;
  // Epoch-based data for phase 2, in descending order
  phase2Epochs: IndexerBlitzPointsEpoch[];
}

export interface GetIndexerBlastPointsParams {
  address: string;
}

export interface GetIndexerBlastPointsResponse {
  points: BigDecimal;
  gold: BigDecimal;
}

export interface GetIndexerBlitzInitialDropConditionsParams {
  address: string;
}

export interface GetIndexerBlitzInitialDropConditionsResponse {
  // Amount eligible for the initial drop
  amount: BigDecimal;
  // Deadline in seconds to claim
  deadline: BigDecimal;
  // Whether the address has reached 100+ USDB in acct value
  accountValueReached: boolean;
  // Whether address has completed 2 perp trades
  perpTradesCompleted: boolean;
  // Whether address has a verified tweet tagging Blitz
  tweeted: boolean;
}

export interface GetIndexerBlitzPointsLeaderboardParams {
  epoch: number;
  startCursor?: number;
  limit: number;
}

export interface GetIndexerBlitzPointsLeaderboardResponse {
  positions: Array<{
    rank: BigDecimal;
    address: string;
    referralPoints: BigDecimal;
    tradingPoints: BigDecimal;
  }>;
}

/**
 * Maker stats
 */

export interface GetIndexerMakerStatisticsParams {
  productId: number;
  epoch: number;
  interval: number;
}

export interface IndexerMakerSnapshot {
  timestamp: BigDecimal;
  makerFee: BigDecimal;
  uptime: BigDecimal;
  sumQMin: BigDecimal;
  qScore: BigDecimal;
  makerShare: BigDecimal;
  expectedMakerReward: BigDecimal;
}

export interface IndexerMaker {
  address: string;
  snapshots: IndexerMakerSnapshot[];
}

export interface GetIndexerMakerStatisticsResponse {
  rewardCoefficient: BigDecimal;
  makers: IndexerMaker[];
}

export interface GetIndexerLeaderboardParams {
  contestId: number;
  rankType: IndexerLeaderboardRankType;
  // Min rank inclusive
  startCursor?: string;
  limit?: number;
}

export interface IndexerLeaderboardParticipant {
  subaccount: Subaccount;
  contestId: number;
  pnl: BigDecimal;
  pnlRank: BigDecimal;
  percentRoi: BigDecimal;
  roiRank: BigDecimal;
  // Float indicating the ending account value at the time the snapshot was taken i.e: at updateTime
  accountValue: BigDecimal;
  // Float indicating the trading volume at the time the snapshot was taken i.e: at updateTime.
  // Null for contests that have no volume requirement.
  volume?: BigDecimal;
  // Seconds
  updateTime: BigDecimal;
}

export interface GetIndexerLeaderboardResponse {
  participants: IndexerLeaderboardParticipant[];
}

export interface GetIndexerLeaderboardParticipantParams {
  contestIds: number[];
  subaccount: Subaccount;
}

export interface GetIndexerLeaderboardParticipantResponse {
  // If the subaccount is not eligible for a given contest, it would not be included in the response.
  // contestId -> IndexerLeaderboardParticipant
  participant: Record<string, IndexerLeaderboardParticipant>;
}

export interface GetIndexerLeaderboardContestsParams {
  contestIds: number[];
}

export interface IndexerLeaderboardContest {
  contestId: number;
  // NOTE: Start / End times are ignored when `period` is non-zero.
  // Start time in seconds
  startTime: BigDecimal;
  // End time in seconds
  endTime: BigDecimal;
  // Contest duration in seconds; when set to 0, contest duration is [startTime,endTime];
  // Otherwise, contest runs indefinitely in the interval [lastUpdated - period, lastUpdated] if active;
  period: BigDecimal;
  // Last updated time in Seconds
  lastUpdated: BigDecimal;
  totalParticipants: BigDecimal;
  // Float indicating the min account value required to be eligible for this contest e.g: 250.0
  minRequiredAccountValue: BigDecimal;
  // Float indicating the min trading volume required to be eligible for this contest e.g: 1000.0
  minRequiredVolume: BigDecimal;
  // For market-specific contests, only the volume from these products will be counted.
  requiredProductIds: number[];
  active: boolean;
}

export interface GetIndexerLeaderboardContestsResponse {
  contests: IndexerLeaderboardContest[];
}

export interface GetIndexerVrtxTokenInfoParams {
  tokenInfoType: IndexerVrtxTokenInfoType;
}

/**
 * Represents the total or circulating supply of the VRTX token as a float number.
 *
 * @typedef {number} GetIndexerVrtxTokenInfoResponse
 * @remarks This value does not include token decimals. It is a base 10 number.
 *          For instance, 10 VRTX will be represented as 10.0, not 10*10^18.
 */
export type GetIndexerVrtxTokenInfoResponse = number;

export type GetIndexerFastWithdrawalSignatureParams =
  IndexerServerFastWithdrawalSignatureParams;

export interface GetIndexerFastWithdrawalSignatureResponse {
  idx: string;
  tx: VertexWithdrawCollateralTx['withdraw_collateral'];
  txBytes: string;
  signatures: string[];
}
