import {
  ProductEngineType,
  QUOTE_PRODUCT_ID,
} from '@vertex-protocol/contracts';
import { toBigDecimal } from '@vertex-protocol/utils';

import { IndexerBaseClient } from './IndexerBaseClient';
import {
  BaseIndexerPaginatedEvent,
  IndexerCollateralEvent,
  IndexerEventPerpStateSnapshot,
  IndexerEventSpotStateSnapshot,
  IndexerEventWithTx,
  IndexerLiquidationEvent,
  IndexerLpEvent,
  IndexerQueryPaginatedInterestFundingPaymentsResponse,
  IndexerQueryPaginatedOrdersParams,
  IndexerQueryPaginatedOrdersResponse,
  IndexerQueryPaginatedRewardsParams,
  IndexerQueryPaginatedRewardsResponse,
  IndexerQuerySubaccountCollateralEventsParams,
  IndexerQuerySubaccountCollateralEventsResponse,
  IndexerQuerySubaccountInterestFundingPaymentsParams,
  IndexerQuerySubaccountLiquidationEventsParams,
  IndexerQuerySubaccountLiquidationEventsResponse,
  IndexerQuerySubaccountLpEventsParams,
  IndexerQuerySubaccountLpEventsResponse,
  IndexerQuerySubaccountMatchEventParams,
  IndexerQuerySubaccountMatchEventsResponse,
  IndexerQuerySubaccountSettlementEventsParams,
  IndexerQuerySubaccountSettlementEventsResponse,
  IndexerSettlementEvent,
  PaginatedIndexerEventsResponse,
} from './types';

export class IndexerClient extends IndexerBaseClient {
  async getPaginatedSubaccountMatchEvents(
    params: IndexerQuerySubaccountMatchEventParams,
  ): Promise<IndexerQuerySubaccountMatchEventsResponse> {
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

    return this.getPaginationEventsResponse(events, requestedLimit);
  }

  async getPaginatedSubaccountLpEvents(
    params: IndexerQuerySubaccountLpEventsParams,
  ): Promise<IndexerQuerySubaccountLpEventsResponse> {
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
    return this.getPaginationEventsResponse(events, requestedLimit);
  }

  async getPaginatedSubaccountCollateralEvents(
    params: IndexerQuerySubaccountCollateralEventsParams,
  ): Promise<IndexerQuerySubaccountCollateralEventsResponse> {
    const {
      startCursor,
      limit: requestedLimit,
      subaccountName,
      subaccountOwner,
    } = params;

    const limit = requestedLimit + 1;
    const baseResponse = await this.getEvents({
      startCursor,
      eventTypes: params.eventTypes ?? [
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

    return this.getPaginationEventsResponse(events, requestedLimit);
  }

  async getPaginatedSubaccountOrders(
    params: IndexerQueryPaginatedOrdersParams,
  ): Promise<IndexerQueryPaginatedOrdersResponse> {
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
    params: IndexerQuerySubaccountSettlementEventsParams,
  ): Promise<IndexerQuerySubaccountSettlementEventsResponse> {
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

    return this.getPaginationEventsResponse(events, requestedLimit);
  }

  async getPaginatedSubaccountLiquidationEvents(
    params: IndexerQuerySubaccountLiquidationEventsParams,
  ): Promise<IndexerQuerySubaccountLiquidationEventsResponse> {
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
          lps: [],
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

      // Event without balance change - not part of this liq
      // However, we could have zero balance changes for the quote product if this was a partial liquidation
      if (
        balanceDelta.isZero() &&
        lpBalanceDelta.isZero() &&
        event.state.market.productId !== QUOTE_PRODUCT_ID
      ) {
        return;
      }

      if (!lpBalanceDelta.isZero()) {
        // LP Decomposition
        mappedEvent.lps?.push({
          amountLpDecomposed: lpBalanceDelta.negated(),
          underlyingBalanceDelta: balanceDelta,
          indexerEvent: event,
        });
      } else {
        // Actual underlying balance change
        if (event.state.type === ProductEngineType.PERP) {
          mappedEvent.perp = {
            amountLiquidated: balanceDelta.negated(),
            // This cast is safe because we're checking for event.state.type
            indexerEvent:
              event as IndexerEventWithTx<IndexerEventPerpStateSnapshot>,
          };
        } else if (event.state.market.productId === QUOTE_PRODUCT_ID) {
          mappedEvent.quote = {
            balanceDelta,
            indexerEvent:
              event as IndexerEventWithTx<IndexerEventSpotStateSnapshot>,
          };
        } else {
          mappedEvent.spot = {
            amountLiquidated: balanceDelta.negated(),
            indexerEvent:
              event as IndexerEventWithTx<IndexerEventSpotStateSnapshot>,
          };
        }
      }

      // Valid liq, so set into map
      eventsBySubmissionIdx.set(event.submissionIndex, mappedEvent);
    });

    // Force cast to get rid of the `Partial`
    const events = Array.from(
      eventsBySubmissionIdx.values(),
    ) as IndexerLiquidationEvent[];
    return this.getPaginationEventsResponse(events, requestedLimit);
  }

  /**
   * Get all interest funding payments for a given subaccount with the standard pagination response
   * This is a simple wrapper over the underlying `getInterestFundingPayments` function. Very little
   * additional processing is needed because the endpoint is well structured for pagination
   *
   * @param params
   */
  async getPaginatedSubaccountInterestFundingPayments(
    params: IndexerQuerySubaccountInterestFundingPaymentsParams,
  ): Promise<IndexerQueryPaginatedInterestFundingPaymentsResponse> {
    const { limit, productIds, startCursor, subaccountName, subaccountOwner } =
      params;
    const baseResponse = await this.getInterestFundingPayments({
      limit,
      productIds,
      startCursor,
      subaccount: {
        subaccountName,
        subaccountOwner,
      },
    });

    return {
      ...baseResponse,
      meta: {
        hasMore: baseResponse.nextCursor != null,
        nextCursor: baseResponse.nextCursor ?? undefined,
      },
    };
  }

  /**
   * Paginated rewards query that paginates on epoch number.
   *
   * @param params
   */
  async getPaginatedRewards(
    params: IndexerQueryPaginatedRewardsParams,
  ): Promise<IndexerQueryPaginatedRewardsResponse> {
    const requestedLimit = params.limit;

    const baseResponse = await this.getRewards({
      address: params.address,
      // Query for 1 more epoch for proper pagination
      limit: requestedLimit + 1,
      // Start cursor is the next epoch number
      start: Number(params.startCursor),
    });

    // Truncate the response to the requested limit
    return {
      ...baseResponse,
      epochs: baseResponse.epochs.slice(0, requestedLimit),
      meta: {
        hasMore: baseResponse.epochs.length > requestedLimit,
        // Next cursor is the epoch number of the (requestedLimit+1)th item
        nextCursor: baseResponse.epochs[requestedLimit]?.epoch.toFixed(),
      },
    };
  }

  /**
   * A util function to generate the standard pagination response for events
   * @param events
   * @param requestedLimit given by consumers of the SDK
   * @private
   */
  private getPaginationEventsResponse<T extends BaseIndexerPaginatedEvent>(
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
        // If len(events) === len(truncatedEvents), there are no more entries and this is undefined
        nextCursor: events[truncatedEvents.length]?.submissionIndex,
      },
    };
  }
}
