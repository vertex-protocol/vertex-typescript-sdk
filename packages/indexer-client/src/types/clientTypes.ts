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

export interface GetIndexerSummaryParams {
  subaccount: Subaccount;
  // A series of timestamps for which to return a summary of the subaccount
  timestamp: number[];
}

export interface IndexerSummaryBalance {
  productId: number;
  state: IndexerEventPerpStateSnapshot | IndexerEventSpotStateSnapshot;
  trackedVars: IndexerBalanceTrackedVars;
}

export interface IndexerSubaccountSummary {
  timestamp: BigDecimal;
  balances: IndexerSummaryBalance[];
}

// Map of timestamp requested -> summary for that time
export type GetIndexerSummaryResponse = Record<
  string,
  IndexerSubaccountSummary
>;

export interface GetIndexerSubaccountRewardsParams {
  address: string;
}

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

export interface IndexerRewardEpoch {
  epoch: number;
  startTime: BigDecimal;
  period: BigDecimal;
  numEligibleAddresses: number;
  addressRewards: IndexerSubaccountRewardsForProduct[];
  globalRewards: IndexerGlobalRewardsForProduct[];
}

export interface GetSubaccountIndexerRewardsResponse {
  epochs: IndexerRewardEpoch[];
  updateTime: BigDecimal;
}

export interface GetIndexerPerpPricesParams {
  productId: number;
}

export interface GetIndexerPerpPricesResponse {
  productId: number;
  indexPrice: BigDecimal;
  markPrice: BigDecimal;
  // Seconds
  updateTime: BigDecimal;
}

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

export interface GetIndexerFundingRateParams {
  productId: number;
}

export interface GetIndexerFundingRateResponse {
  productId: number;
  fundingRate: BigDecimal;
  // Seconds
  updateTime: BigDecimal;
}

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

export interface GetIndexerProductSnapshotsParams {
  startCursor?: string;
  productId: number;
  maxTimestampInclusive?: number;
  limit: number;
}

export type GetIndexerProductSnapshotsResponse = (Market & {
  timestamp: BigDecimal;
  submissionIndex: string;
})[];

// There can be multiple events per tx, this allows a limit depending on usecase
export type GetIndexerEventsLimitType = 'events' | 'txs';

export interface GetIndexerEventsParams {
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

export interface IndexerEvent {
  subaccount: string;
  productId: number;
  submissionIndex: string;
  eventType: IndexerEventType;
  state: IndexerEventSpotStateSnapshot | IndexerEventPerpStateSnapshot;
  trackedVars: IndexerBalanceTrackedVars;
}

export interface IndexerEventWithTx extends IndexerEvent {
  timestamp: BigDecimal;
}

export type GetIndexerEventsResponse = IndexerEventWithTx[];

export interface GetIndexerOrdersParams {
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
  orderType: OrderExpirationType;
  expiration: number;
  nonce: BigDecimal;
  // Derived from the nonce
  recvTimeSeconds: number;
  // Fill amounts
  baseFilled: BigDecimal;
  // Includes fee
  quoteFilled: BigDecimal;
  fee: BigDecimal;
}

export type GetIndexerOrdersResponse = IndexerOrder[];

export interface GetIndexerMatchEventsParams {
  // When not given, will return all maker events
  subaccount?: Subaccount;
  productIds?: number[];
  maxTimestampInclusive?: number;
  limit: number;
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
  fee: BigDecimal;
  cumulativeBaseFilled: BigDecimal;
  cumulativeQuoteFilled: BigDecimal;
  cumulativeFee: BigDecimal;
  submissionIndex: string;
  timestamp: BigDecimal;
  preBalances: IndexerMatchEventBalances;
  postBalances: IndexerMatchEventBalances;
}

export type GetIndexerMatchEventsResponse = IndexerMatchEvent[];

export interface GetIndexerQuotePriceResponse {
  price: BigDecimal;
}

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
