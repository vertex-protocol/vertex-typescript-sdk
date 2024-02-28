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
import {
  IndexerServerQueryClaimArbMerkleProofsParams,
  IndexerServerQueryClaimVrtxMerkleProofsParams,
  IndexerServerQueryListSubaccountsParams,
} from './serverTypes';
import { VertexTx } from './VertexTx';

/**
 * Base Types
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
 * List Subaccounts
 */

export type IndexerQueryListSubaccountsParams =
  IndexerServerQueryListSubaccountsParams;

export type IndexerQueryListSubaccountsResponse = ({
  hexId: string;
} & Subaccount)[];

/**
 * Subaccount snapshots
 */

export interface IndexerQueryMultiSubaccountSnapshotsParams {
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

export interface IndexerQueryMultiSubaccountSnapshotsResponse {
  // Utility for retrieving a subaccount's hex ID, in the same order as the request params
  subaccountHexIds: string[];
  // Map of subaccount hex -> timestamp requested -> summary for that time
  snapshots: Record<string, Record<string, IndexerSubaccountSnapshot>>;
}

/**
 * Rewards
 */

export interface IndexerQueryRewardsParams {
  address: string;
  // Inclusive, epochs are returned in descending order
  start?: number;
  limit?: number;
}

export type IndexerQueryTakerRewardsParams = IndexerQueryRewardsParams;

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

export interface IndexerQueryRewardsResponse {
  epochs: IndexerRewardsEpoch[];
  updateTime: BigDecimal;
  totalReferrals: number;
}

export interface IndexerTakerRewardsEpoch {
  epoch: number;
  takerTokens: BigDecimal;
  takerReferralTokens: BigDecimal;
}

export interface IndexerQueryTakerRewardsResponse {
  epochs: IndexerTakerRewardsEpoch[];
  updateTime: BigDecimal;
  totalReferrals: number;
}

/**
 * Referral Code
 */

export interface IndexerQueryReferralCodeParams {
  subaccount: Subaccount;
}

export interface IndexerQueryReferralCodeResponse {
  referralCode: string | null;
}

/**
 * Perp prices
 */

export interface IndexerQueryPerpPricesParams {
  productId: number;
}

export interface IndexerPerpPrices {
  productId: number;
  indexPrice: BigDecimal;
  markPrice: BigDecimal;
  // Seconds
  updateTime: BigDecimal;
}

export type IndexerQueryPerpPricesResponse = IndexerPerpPrices;

export interface IndexerQueryMultiProductPerpPricesParams {
  productIds: number[];
}

// Map of productId -> IndexerPerpPrices
export type IndexerQueryMultiProductPerpPricesResponse = Record<
  number,
  IndexerPerpPrices
>;

/**
 * Oracle prices
 */

export interface IndexerQueryOraclePricesParams {
  productIds: number[];
}

export interface IndexerOraclePrice {
  productId: number;
  oraclePrice: BigDecimal;
  // Seconds
  updateTime: BigDecimal;
}

export type IndexerQueryOraclePricesResponse = IndexerOraclePrice[];

/**
 * Funding Rates
 */

export interface IndexerQueryFundingRateParams {
  productId: number;
}

export interface IndexerFundingRate {
  productId: number;
  fundingRate: BigDecimal;
  // Seconds
  updateTime: BigDecimal;
}

export type IndexerQueryFundingRateResponse = IndexerFundingRate;

export interface IndexerQueryMultiProductFundingRatesParams {
  productIds: number[];
}

// Map of productId -> IndexerFundingRate
export type IndexerQueryMultiProductFundingRatesResponse = Record<
  number,
  IndexerFundingRate
>;

/**
 * Candlesticks
 */

export interface IndexerQueryCandlesticksParams {
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

export type IndexerQueryCandlesticksResponse = Candlestick[];

/**
 * Product Snapshots
 */

export interface IndexerQueryProductSnapshotsParams {
  // Max submission index, inclusive
  startCursor?: string;
  productId: number;
  maxTimestampInclusive?: number;
  limit: number;
}

export interface IndexerProductSnapshot extends Market {
  submissionIndex: string;
}

export type IndexerQueryProductSnapshotsResponse = IndexerProductSnapshot[];

export interface IndexerQueryMultiProductSnapshotsParams {
  productIds: number[];
  maxTimestampInclusive?: number;
}

// Map of productId -> IndexerProductSnapshot
export type IndexerQueryMultiProductSnapshotsResponse = Record<
  number,
  IndexerProductSnapshot
>;

/**
 * Events
 */

// There can be multiple events per tx, this allows a limit depending on usecase
export type IndexerQueryEventsLimitType = 'events' | 'txs';

export interface IndexerQueryEventsParams {
  // Max submission index, inclusive
  startCursor?: string;
  subaccount?: Subaccount;
  productIds?: number[];
  eventTypes?: IndexerEventType[];
  maxTimestampInclusive?: number;
  // Descending order for idx (time), defaults to true
  desc?: boolean;
  limit?: {
    type: IndexerQueryEventsLimitType;
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

export type IndexerQueryEventsResponse = IndexerEventWithTx[];

/**
 * Orders
 */

export interface IndexerQueryOrdersParams {
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

export type IndexerQueryOrdersResponse = IndexerOrder[];

/**
 * Match events
 */

export interface IndexerQueryMatchEventsParams {
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

export type IndexerQueryMatchEventsResponse = IndexerMatchEvent[];

/**
 * Quote price
 */

export interface IndexerQueryQuotePriceResponse {
  price: BigDecimal;
}

/**
 * Linked Signer
 */

export interface IndexerQueryLinkedSignerParams {
  subaccount: Subaccount;
}

export interface IndexerQueryLinkedSignerResponse {
  totalTxLimit: BigDecimal;
  remainingTxs: BigDecimal;
  // If remainingTxs is 0, this is the time until the next link signer tx can be sent
  waitTimeUntilNextTx: BigDecimal;
  // If zero address, none is configured
  signer: string;
}

/**
 * Market snapshots
 */

export interface IndexerQueryMarketSnapshotsParams {
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

export type IndexerQueryMarketSnapshotsResponse = IndexerMarketSnapshot[];

/**
 * Interest / funding payments
 */

export interface IndexerQueryInterestFundingPaymentsParams {
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

export interface IndexerQueryInterestFundingPaymentsResponse {
  interestPayments: IndexerProductPayment[];
  fundingPayments: IndexerProductPayment[];
  nextCursor: string | null;
}

/**
 * Merkle proof
 */

export interface IndexerMerkleProof {
  proof: string[];
  totalAmount: BigDecimal;
}

export type IndexerQueryClaimVrtxMerkleProofsParams =
  IndexerServerQueryClaimVrtxMerkleProofsParams;

export type IndexerQueryClaimVrtxMerkleProofsResponse = IndexerMerkleProof[];

/**
 * Arb rewards
 */

export interface IndexerQueryArbRewardsParams {
  address: string;
}

export type IndexerSubaccountArbRewardsForProduct = Pick<
  IndexerSubaccountRewardsForProduct,
  'productId' | 'takerVolume' | 'takerFee' | 'takerTokens'
>;

export type IndexerGlobalArbRewardsForProduct = Pick<
  IndexerGlobalRewardsForProduct,
  'productId' | 'takerFees' | 'takerTokens' | 'takerVolumes'
>;

export interface IndexerArbRewardsWeek {
  week: number;
  startTime: BigDecimal;
  period: BigDecimal;
  addressRewards: IndexerSubaccountArbRewardsForProduct[];
  globalRewards: IndexerGlobalArbRewardsForProduct[];
}

export interface IndexerQueryArbRewardsResponse {
  weeks: IndexerArbRewardsWeek[];
  updateTime: BigDecimal;
}

/**
 * Arb claim merkle proof
 */

export type IndexerQueryClaimArbMerkleProofsParams =
  IndexerServerQueryClaimArbMerkleProofsParams;

export type IndexerQueryClaimArbMerkleProofsResponse =
  IndexerQueryClaimVrtxMerkleProofsResponse;

/**
 * Maker stats
 */

export interface IndexerQueryMakerStatisticsParams {
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

export interface IndexerQueryMakerStatisticsResponse {
  rewardCoefficient: BigDecimal;
  makers: IndexerMaker[];
}
