import { BigDecimal } from '@vertex-protocol/utils';
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
  timestamp: number;
}

export interface IndexerSummaryBalance {
  productId: number;
  state: IndexerEventPerpStateSnapshot | IndexerEventSpotStateSnapshot;
  trackedVars: IndexerBalanceTrackedVars;
}

export type GetIndexerSummaryResponse = IndexerSummaryBalance[];

export interface GetIndexerSubaccountRewardsParams {
  subaccount: Subaccount;
}

export interface IndexerRewardEpoch {
  epoch: number;
  startTime: BigDecimal;
  period: BigDecimal;
  totalEpochMakerTokens: BigDecimal;
  totalEpochTakerTokens: BigDecimal;
  subaccountMakerTokens: BigDecimal;
  subaccountTakerTokens: BigDecimal;
  updateTime: BigDecimal;
}

export type GetSubaccountIndexerRewardsResponse = IndexerRewardEpoch[];

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
}

export type GetIndexerMatchEventsResponse = IndexerMatchEvent[];

export interface GetIndexerQuotePriceResponse {
  price: BigDecimal;
}
