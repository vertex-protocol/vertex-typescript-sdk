import {
  ProductEngineType,
  QUOTE_PRODUCT_ID,
} from '@vertex-protocol/contracts';
import { toBigDecimal } from '@vertex-protocol/utils';

import { IndexerBaseClient } from './IndexerBaseClient';
import {
  BaseIndexerPaginatedEvent,
  GetIndexerPaginatedOrdersParams,
  GetIndexerPaginatedOrdersResponse,
  GetIndexerSubaccountCollateralEventsParams,
  GetIndexerSubaccountCollateralEventsResponse,
  GetIndexerSubaccountLiquidationEventsParams,
  GetIndexerSubaccountLiquidationEventsResponse,
  GetIndexerSubaccountLpEventsParams,
  GetIndexerSubaccountLpEventsResponse,
  GetIndexerSubaccountMatchEventParams,
  GetIndexerSubaccountMatchEventsResponse,
  GetIndexerSubaccountSettlementEventsParams,
  GetIndexerSubaccountSettlementEventsResponse,
  IndexerCollateralEvent,
  IndexerLiquidationEvent,
  IndexerLpEvent,
  IndexerSettlementEvent,
  PaginatedIndexerEventsResponse,
} from './types';
import { CollateralEventType } from './types/collateralEventType';

export class IndexerClient extends IndexerBaseClient {
  async getPaginatedSubaccountMatchEvents(
    params: GetIndexerSubaccountMatchEventParams,
  ): Promise<GetIndexerSubaccountMatchEventsResponse> {
    const {
      startCursor,
      limit: requestedLimit,
      subaccountName,
      subaccountOwner,
    } = params;

    const limit = requestedLimit + 1;
    const events = await this.getMatchEvents({
      startCursor,
      limit,
      subaccount: { subaccountName, subaccountOwner },
      productIds: params.productIds,
    });

    return this.getPaginationResponse(events, requestedLimit);
  }

  async getPaginatedSubaccountLpEvents(
    params: GetIndexerSubaccountLpEventsParams,
  ): Promise<GetIndexerSubaccountLpEventsResponse> {
    const {
      startCursor,
      limit: requestedLimit,
      subaccountName,
      subaccountOwner,
    } = params;

    // There are 2 events per mint/burn for spot - one associated with the product & the other with the quote
    // There is only 1 event per mint/burn for perp - associated with the product, where the quote delta is encoded in vQuote
    const limit = requestedLimit + 1;
    const baseResponse = await this.getEvents({
      startCursor,
      eventTypes: ['mint_lp', 'burn_lp'],
      limit: {
        type: 'txs',
        value: limit,
      },
      subaccount: { subaccountName, subaccountOwner },
    });

    // Now aggregate results by the submission index, use map to maintain insertion order
    const eventsBySubmissionIdx = new Map<string, IndexerLpEvent>();

    baseResponse.forEach((event) => {
      const mappedEvent = (() => {
        const existingEvent = eventsBySubmissionIdx.get(event.submissionIndex);
        if (existingEvent) {
          return existingEvent;
        }

        const newEvent: IndexerLpEvent = {
          // These fields will be updated properly later
          lpDelta: toBigDecimal(0),
          baseDelta: toBigDecimal(0),
          quoteDelta: toBigDecimal(0),
          baseSnapshot: event.state,
          quoteSnapshot: undefined,
          timestamp: event.timestamp,
          submissionIndex: event.submissionIndex,
        };
        eventsBySubmissionIdx.set(event.submissionIndex, newEvent);

        return newEvent;
      })();

      const balanceDelta = event.state.postBalance.amount.minus(
        event.state.preBalance.amount,
      );
      const lpBalanceDelta = event.state.postBalance.lpAmount.minus(
        event.state.preBalance.lpAmount,
      );

      // Perp - this should be the only relevant event
      if (event.state.type === ProductEngineType.PERP) {
        mappedEvent.lpDelta = lpBalanceDelta;
        mappedEvent.baseDelta = balanceDelta;
        mappedEvent.quoteDelta = event.state.postBalance.vQuoteBalance.minus(
          event.state.preBalance.vQuoteBalance,
        );
        mappedEvent.baseSnapshot = event.state;
        return;
      }

      // Quote
      if (event.state.market.productId === QUOTE_PRODUCT_ID) {
        mappedEvent.quoteDelta = balanceDelta;
        mappedEvent.quoteSnapshot = event.state;
        return;
      }

      // Spot
      mappedEvent.lpDelta = lpBalanceDelta;
      mappedEvent.baseDelta = balanceDelta;
      mappedEvent.baseSnapshot = event.state;
    });

    // Force cast to get rid of the `Partial`
    const events = Array.from(eventsBySubmissionIdx.values());
    return this.getPaginationResponse(events, requestedLimit);
  }

  async getPaginatedSubaccountCollateralEvents(
    params: GetIndexerSubaccountCollateralEventsParams,
  ): Promise<GetIndexerSubaccountCollateralEventsResponse> {
    const {
      startCursor,
      limit: requestedLimit,
      subaccountName,
      subaccountOwner,
    } = params;

    const limit = requestedLimit + 1;
    const baseResponse = await this.getEvents({
      startCursor,
      eventTypes: params.eventTypes || [
        'deposit_collateral',
        'withdraw_collateral',
      ],
      limit: {
        type: 'txs',
        value: limit,
      },
      subaccount: { subaccountName, subaccountOwner },
    });

    const events = baseResponse.map((event): IndexerCollateralEvent => {
      if (event.state.type !== ProductEngineType.SPOT) {
        throw Error('Incorrect event state for collateral event');
      }

      return {
        timestamp: event.timestamp,
        submissionIndex: event.submissionIndex,
        snapshot: event.state,
        amount: event.state.postBalance.amount.minus(
          event.state.preBalance.amount,
        ),
        newAmount: event.state.postBalance.amount,
      };
    });

    return this.getPaginationResponse(events, requestedLimit);
  }

  async getPaginatedSubaccountOrders(
    params: GetIndexerPaginatedOrdersParams,
  ): Promise<GetIndexerPaginatedOrdersResponse> {
    const {
      startCursor,
      limit: requestedLimit,
      subaccountName,
      subaccountOwner,
      productIds,
    } = params;

    const limit = requestedLimit + 1;
    const baseResponse = await this.getOrders({
      startCursor,
      subaccount: { subaccountName, subaccountOwner },
      limit,
      productIds,
    });

    // Same pagination meta logic as events, but duplicate for now as this return type is slightly different
    const truncatedOrders = baseResponse.slice(0, requestedLimit);
    const hasMore = baseResponse.length > truncatedOrders.length;
    return {
      meta: {
        hasMore,
        nextCursor: baseResponse[truncatedOrders.length]?.submissionIndex,
      },
      orders: truncatedOrders,
    };
  }

  async getPaginatedSubaccountSettlementEvents(
    params: GetIndexerSubaccountSettlementEventsParams,
  ): Promise<GetIndexerSubaccountSettlementEventsResponse> {
    const {
      startCursor,
      limit: requestedLimit,
      subaccountName,
      subaccountOwner,
    } = params;

    // Each settlement has a quote & perp balance change, so 2 events per settlement tx
    const limit = requestedLimit + 1;
    const baseResponse = await this.getEvents({
      startCursor,
      eventTypes: ['settle_pnl'],
      limit: {
        type: 'txs',
        value: limit,
      },
      subaccount: { subaccountName, subaccountOwner },
    });

    const events = baseResponse
      .map((event): IndexerSettlementEvent | undefined => {
        if (event.state.market.productId === QUOTE_PRODUCT_ID) {
          return;
        }
        if (event.state.type !== ProductEngineType.PERP) {
          throw Error('Incorrect event state for settlement event');
        }

        return {
          timestamp: event.timestamp,
          submissionIndex: event.submissionIndex,
          snapshot: event.state,
          // Spot quote delta = -vQuote delta
          quoteDelta: event.state.preBalance.vQuoteBalance.minus(
            event.state.postBalance.vQuoteBalance,
          ),
        };
      })
      .filter((event): event is IndexerSettlementEvent => !!event);

    return this.getPaginationResponse(events, requestedLimit);
  }

  async getPaginatedSubaccountLiquidationEvents(
    params: GetIndexerSubaccountLiquidationEventsParams,
  ): Promise<GetIndexerSubaccountLiquidationEventsResponse> {
    const {
      startCursor,
      limit: requestedLimit,
      subaccountName,
      subaccountOwner,
    } = params;

    // There is 1 event emitted per product, including quote
    // However, if the balance change is 0, then the liquidation did not touch the product
    // A tx operates on a given health group, so only a spot & its associated perp can be actually liquidated within a single tx
    // with an associated quote balance change
    const limit = requestedLimit + 1;
    const baseResponse = await this.getEvents({
      startCursor,
      eventTypes: ['liquidate_subaccount'],
      limit: {
        type: 'txs',
        value: limit,
      },
      subaccount: { subaccountName, subaccountOwner },
    });

    // Now aggregate results by the submission index, use map to maintain insertion order
    const eventsBySubmissionIdx = new Map<
      string,
      Partial<IndexerLiquidationEvent>
    >();

    baseResponse.forEach((event) => {
      const mappedEvent = (() => {
        const existingEvent = eventsBySubmissionIdx.get(event.submissionIndex);
        if (existingEvent) {
          return existingEvent;
        }

        const newEvent: Partial<IndexerLiquidationEvent> = {
          perp: undefined,
          spot: undefined,
          quote: undefined,
          timestamp: event.timestamp,
          submissionIndex: event.submissionIndex,
        };

        return newEvent;
      })();

      // The original balance is the negated delta
      const balanceDelta = event.state.postBalance.amount.minus(
        event.state.preBalance.amount,
      );
      const lpBalanceDelta = event.state.postBalance.lpAmount.minus(
        event.state.preBalance.lpAmount,
      );

      if (balanceDelta.isZero() && lpBalanceDelta.isZero()) {
        // Event without balance change - not part of this liq
        return;
      }

      if (event.state.type === ProductEngineType.PERP) {
        mappedEvent.perp = {
          balanceLiquidated: balanceDelta.negated(),
          lpBalanceLiquidated: lpBalanceDelta.negated(),
          ...event.state,
        };
      } else if (event.state.market.productId === QUOTE_PRODUCT_ID) {
        mappedEvent.quote = {
          payment: event.state.postBalance.amount.minus(
            event.state.preBalance.amount,
          ),
          ...event.state,
        };
      } else {
        mappedEvent.spot = {
          balanceLiquidated: balanceDelta.negated(),
          lpBalanceLiquidated: lpBalanceDelta.negated(),
          ...event.state,
        };
      }

      // Valid liq, so set into map
      eventsBySubmissionIdx.set(event.submissionIndex, mappedEvent);
    });

    // Force cast to get rid of the `Partial`
    const events = Array.from(
      eventsBySubmissionIdx.values(),
    ) as IndexerLiquidationEvent[];
    return this.getPaginationResponse(events, requestedLimit);
  }

  private getPaginationResponse<T extends BaseIndexerPaginatedEvent>(
    events: T[],
    requestedLimit: number,
  ): PaginatedIndexerEventsResponse<T> {
    const truncatedEvents = events.slice(0, requestedLimit);
    const hasMore = events.length > truncatedEvents.length;

    return {
      events: truncatedEvents,
      meta: {
        hasMore,
        // We want the NEXT available cursor, so we use the first event after the truncation cutoff
        nextCursor: events[truncatedEvents.length]?.submissionIndex,
      },
    };
  }
}
