import { Subaccount } from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils/dist/math/bigDecimal';
import {
  IndexerEventBalanceStateSnapshot,
  IndexerEventPerpStateSnapshot,
  IndexerEventSpotStateSnapshot,
  IndexerEventWithTx,
  IndexerMatchEvent,
  IndexerOrder,
  IndexerQueryInterestFundingPaymentsParams,
  IndexerQueryInterestFundingPaymentsResponse,
  IndexerQueryRewardsParams,
  IndexerQueryRewardsResponse,
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

/**
 * Collateral
 */

export interface IndexerQuerySubaccountCollateralEventsParams
  extends BaseSubaccountPaginationParams {
  eventTypes?: CollateralEventType[];
}

export interface IndexerCollateralEvent extends BaseIndexerPaginatedEvent {
  // Positive for deposits, negative for withdrawals
  amount: BigDecimal;
  // The collateral balance after the event
  newAmount: BigDecimal;
  snapshot: IndexerEventSpotStateSnapshot;
}

export type IndexerQuerySubaccountCollateralEventsResponse =
  PaginatedIndexerEventsResponse<IndexerCollateralEvent>;

/**
 * LP
 */

export type IndexerQuerySubaccountLpEventsParams =
  BaseSubaccountPaginationParams;

export interface IndexerLpEvent extends BaseIndexerPaginatedEvent {
  // Positive for mint, negative for burn
  lpDelta: BigDecimal;
  // Deltas for base and quote
  baseDelta: BigDecimal;
  quoteDelta: BigDecimal;
  baseSnapshot: IndexerEventBalanceStateSnapshot;
  // Only if the LP event is for a spot product
  // This typing could probably be improved
  quoteSnapshot?: IndexerEventSpotStateSnapshot;
}

export type IndexerQuerySubaccountLpEventsResponse =
  PaginatedIndexerEventsResponse<IndexerLpEvent>;

/**
 * Match events
 */

export interface IndexerQuerySubaccountMatchEventParams
  extends BaseSubaccountPaginationParams {
  // If not given, defaults to all products
  productIds?: number[];
}

export type IndexerQuerySubaccountMatchEventsResponse =
  PaginatedIndexerEventsResponse<IndexerMatchEvent>;

/**
 * Orders
 */

export interface IndexerQueryPaginatedOrdersParams
  extends BaseSubaccountPaginationParams {
  // If not given, defaults to all products
  productIds?: number[];
}

export interface IndexerQueryPaginatedOrdersResponse {
  orders: IndexerOrder[];
  meta: IndexerPaginationMeta;
}

/**
 * Liquidations
 */

export type IndexerQuerySubaccountLiquidationEventsParams =
  BaseSubaccountPaginationParams;

type WithIndexerEvent<
  TData,
  TStateType extends IndexerEventBalanceStateSnapshot,
> = TData & {
  indexerEvent: IndexerEventWithTx<TStateType>;
};

export interface IndexerLiquidationEvent extends BaseIndexerPaginatedEvent {
  // LPs are decomposed first
  lps: WithIndexerEvent<
    {
      amountLpDecomposed: BigDecimal;
      // Change in underlying asset / perp balance from decomposition
      underlyingBalanceDelta: BigDecimal;
    },
    IndexerEventBalanceStateSnapshot
  >[];
  // Either spot or perp will then be liquidated if the subaccount maint. health is below 0
  // Both spot & perp can be liquidated in the same event from a spread liquidation
  spot?: WithIndexerEvent<
    {
      // The original balance that was liquidated
      // ex. if it was originally a short, amount is negative, but the net delta from the liquidation is positive
      amountLiquidated: BigDecimal;
    },
    IndexerEventSpotStateSnapshot
  >;
  perp?: WithIndexerEvent<
    {
      // The original balance that was liquidated
      // ex. if it was originally a short, amount is negative, but the net delta from the liquidation is positive
      amountLiquidated: BigDecimal;
    },
    IndexerEventPerpStateSnapshot
  >;
  // Quote delta for the subaccount
  // Only the SPOT QUOTE payment made for the liquidation. Does not include the perp vQuote balance change
  quote: WithIndexerEvent<
    {
      balanceDelta: BigDecimal;
    },
    IndexerEventSpotStateSnapshot
  >;
}

export type IndexerQuerySubaccountLiquidationEventsResponse =
  PaginatedIndexerEventsResponse<IndexerLiquidationEvent>;

/**
 * Settlement
 */

export type IndexerQuerySubaccountSettlementEventsParams =
  BaseSubaccountPaginationParams;

export interface IndexerSettlementEvent extends BaseIndexerPaginatedEvent {
  // Quote delta for the subaccount being settled
  quoteDelta: BigDecimal;
  snapshot: IndexerEventPerpStateSnapshot;
}

export type IndexerQuerySubaccountSettlementEventsResponse =
  PaginatedIndexerEventsResponse<IndexerSettlementEvent>;

/**
 * Interest / Funding
 */

export type IndexerQuerySubaccountInterestFundingPaymentsParams =
  BaseSubaccountPaginationParams &
    Pick<
      IndexerQueryInterestFundingPaymentsParams,
      'productIds' | 'startCursor'
    >;

export interface IndexerQueryPaginatedInterestFundingPaymentsResponse
  extends IndexerQueryInterestFundingPaymentsResponse {
  meta: IndexerPaginationMeta;
}

/**
 * Paginated rewards query - these paginate on epoch #, which is `number`, but for consistency we use the
 * string pagination params / meta that is used for other paginated queries
 */

export type IndexerQueryPaginatedRewardsParams = IndexerPaginationParams &
  Pick<IndexerQueryRewardsParams, 'address'>;

export type IndexerQueryPaginatedRewardsResponse = WithPaginationMeta &
  IndexerQueryRewardsResponse;
