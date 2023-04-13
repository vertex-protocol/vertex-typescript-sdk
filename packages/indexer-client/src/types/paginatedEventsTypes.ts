import { Subaccount } from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils/dist/math/bigDecimal';
import {
  IndexerEventPerpStateSnapshot,
  IndexerEventSpotStateSnapshot,
  IndexerMatchEvent,
  IndexerOrder,
} from './clientTypes';
import { CollateralEventType } from './collateralEventType';

export interface IndexerPaginationParams {
  limit: number;
  // Retrieves events inclusive of this start cursor
  startCursor?: string;
}

export interface IndexerPaginationMeta {
  hasMore: boolean;
  nextCursor?: string;
}

export type WithPaginationMeta = { meta: IndexerPaginationMeta };

type BaseSubaccountPaginationParams = Subaccount & IndexerPaginationParams;

export interface BaseIndexerPaginatedEvent {
  timestamp: BigDecimal;
  submissionIndex: string;
}

export interface PaginatedIndexerEventsResponse<
  T extends BaseIndexerPaginatedEvent,
> extends WithPaginationMeta {
  events: T[];
}

export type GetIndexerSubaccountCollateralEventsParams =
  BaseSubaccountPaginationParams & {
    eventTypes?: CollateralEventType[];
  };

export interface IndexerCollateralEvent extends BaseIndexerPaginatedEvent {
  // Positive for deposits, negative for withdrawals
  amount: BigDecimal;
  // The collateral balance after the event
  newAmount: BigDecimal;
  snapshot: IndexerEventSpotStateSnapshot;
}

export type GetIndexerSubaccountCollateralEventsResponse =
  PaginatedIndexerEventsResponse<IndexerCollateralEvent>;

export type GetIndexerSubaccountLpEventsParams = BaseSubaccountPaginationParams;

export interface IndexerLpEvent extends BaseIndexerPaginatedEvent {
  // Positive for mint, negative for burn
  lpDelta: BigDecimal;
  // Deltas for base and quote
  baseDelta: BigDecimal;
  quoteDelta: BigDecimal;
  baseSnapshot: IndexerEventSpotStateSnapshot | IndexerEventPerpStateSnapshot;
  // Only if the LP event is for a spot product
  // This typing could probably be improved
  quoteSnapshot?: IndexerEventSpotStateSnapshot;
}

export type GetIndexerSubaccountLpEventsResponse =
  PaginatedIndexerEventsResponse<IndexerLpEvent>;

export interface GetIndexerSubaccountMatchEventParams
  extends BaseSubaccountPaginationParams {
  // If not given, defaults to all products
  productIds?: number[];
}

export type GetIndexerSubaccountMatchEventsResponse =
  PaginatedIndexerEventsResponse<IndexerMatchEvent>;

export interface GetIndexerPaginatedOrdersParams
  extends BaseSubaccountPaginationParams {
  // If not given, defaults to all products
  productIds?: number[];
}

export interface GetIndexerPaginatedOrdersResponse {
  orders: IndexerOrder[];
  meta: IndexerPaginationMeta;
}

export type GetIndexerSubaccountLiquidationEventsParams =
  BaseSubaccountPaginationParams;

// The original balance that was liquidated
// ex. if it was originally a short, amount is negative, but the net delta from the liquidation is positive
interface LiquidationAmounts {
  balanceLiquidated: BigDecimal;
  lpBalanceLiquidated: BigDecimal;
}

export interface IndexerLiquidationEvent extends BaseIndexerPaginatedEvent {
  // Either spot or perp, or both will be liquidated in a single event
  spot?: LiquidationAmounts & IndexerEventSpotStateSnapshot;
  perp?: LiquidationAmounts & IndexerEventPerpStateSnapshot;
  quote: {
    // Payment to the liquidatee for the liquidation
    payment: BigDecimal;
  } & IndexerEventSpotStateSnapshot;
}

export type GetIndexerSubaccountLiquidationEventsResponse =
  PaginatedIndexerEventsResponse<IndexerLiquidationEvent>;

export type GetIndexerSubaccountSettlementEventsParams =
  BaseSubaccountPaginationParams;

export interface IndexerSettlementEvent extends BaseIndexerPaginatedEvent {
  // Quote delta for the subaccount being settled
  quoteDelta: BigDecimal;
  snapshot: IndexerEventPerpStateSnapshot;
}

export type GetIndexerSubaccountSettlementEventsResponse =
  PaginatedIndexerEventsResponse<IndexerSettlementEvent>;
