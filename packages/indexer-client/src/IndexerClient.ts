import {
  ProductEngineType,
  QUOTE_PRODUCT_ID,
  subaccountFromHex,
} from '@vertex-protocol/contracts';
import { toBigDecimal } from '@vertex-protocol/utils';

import { IndexerBaseClient } from './IndexerBaseClient';
import {
  BaseIndexerPaginatedEvent,
  CollateralEventType,
  GetIndexerPaginatedBlitzPointsLeaderboardParams,
  GetIndexerPaginatedBlitzPointsLeaderboardResponse,
  GetIndexerPaginatedInterestFundingPaymentsResponse,
  GetIndexerPaginatedLeaderboardParams,
  GetIndexerPaginatedLeaderboardResponse,
  GetIndexerPaginatedOrdersParams,
  GetIndexerPaginatedOrdersResponse,
  GetIndexerPaginatedRewardsParams,
  GetIndexerPaginatedRewardsResponse,
  GetIndexerPaginatedSonicPointsLeaderboardResponse,
  GetIndexerSubaccountCollateralEventsParams,
  GetIndexerSubaccountCollateralEventsResponse,
  GetIndexerSubaccountInterestFundingPaymentsParams,
  GetIndexerSubaccountLiquidationEventsParams,
  GetIndexerSubaccountLiquidationEventsResponse,
  GetIndexerSubaccountLpEventsParams,
  GetIndexerSubaccountLpEventsResponse,
  GetIndexerSubaccountMatchEventParams,
  GetIndexerSubaccountMatchEventsResponse,
  GetIndexerSubaccountSettlementEventsParams,
  GetIndexerSubaccountSettlementEventsResponse,
  IndexerCollateralEvent,
  IndexerEventPerpStateSnapshot,
  IndexerEventSpotStateSnapshot,
  IndexerEventWithTx,
  IndexerLiquidationEvent,
  IndexerLpEvent,
  IndexerPaginationParams,
  IndexerSettlementEvent,
  PaginatedIndexerEventsResponse,
} from './types';

export class IndexerClient extends IndexerBaseClient {
  async getPaginatedSubaccountMatchEvents(
    params: GetIndexerSubaccountMatchEventParams,
  ): Promise<GetIndexerSubaccountMatchEventsResponse> {
    const {
      startCursor,
      maxTimestampInclusive,
      limit: requestedLimit,
      subaccountName,
      subaccountOwner,
    } = params;

    const limit = requestedLimit + 1;
    const events = await this.getMatchEvents({
      startCursor,
      maxTimestampInclusive,
      limit,
      subaccount: { subaccountName, subaccountOwner },
      productIds: params.productIds,
    });

    return this.getPaginationEventsResponse(events, requestedLimit);
  }

  async getPaginatedSubaccountLpEvents(
    params: GetIndexerSubaccountLpEventsParams,
  ): Promise<GetIndexerSubaccountLpEventsResponse> {
    const {
      startCursor,
      maxTimestampInclusive,
      limit: requestedLimit,
      subaccountName,
      subaccountOwner,
    } = params;

    // There are 2 events per mint/burn for spot - one associated with the product & the other with the quote
    // There is only 1 event per mint/burn for perp - associated with the product, where the quote delta is encoded in vQuote
    const limit = requestedLimit + 1;
    const baseResponse = await this.getEvents({
      startCursor,
      maxTimestampInclusive,
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
          tx: event.tx,
          ...subaccountFromHex(event.subaccount),
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
    params: GetIndexerSubaccountCollateralEventsParams,
  ): Promise<GetIndexerSubaccountCollateralEventsResponse> {
    const {
      startCursor,
      maxTimestampInclusive,
      limit: requestedLimit,
      subaccountName,
      subaccountOwner,
    } = params;

    const limit = requestedLimit + 1;
    const baseResponse = await this.getEvents({
      startCursor,
      maxTimestampInclusive,
      eventTypes: params.eventTypes ?? [
        'deposit_collateral',
        'withdraw_collateral',
        'transfer_quote',
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
        // This cast is safe as the query param restricts to collateral events
        eventType: event.eventType as CollateralEventType,
        submissionIndex: event.submissionIndex,
        snapshot: event.state,
        amount: event.state.postBalance.amount.minus(
          event.state.preBalance.amount,
        ),
        newAmount: event.state.postBalance.amount,
        tx: event.tx,
        ...subaccountFromHex(event.subaccount),
      };
    });

    return this.getPaginationEventsResponse(events, requestedLimit);
  }

  async getPaginatedSubaccountOrders(
    params: GetIndexerPaginatedOrdersParams,
  ): Promise<GetIndexerPaginatedOrdersResponse> {
    const {
      startCursor,
      maxTimestampInclusive,
      limit: requestedLimit,
      subaccountName,
      subaccountOwner,
      productIds,
    } = params;

    const limit = requestedLimit + 1;
    const baseResponse = await this.getOrders({
      startCursor,
      maxTimestampInclusive,
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
      maxTimestampInclusive,
      limit: requestedLimit,
      subaccountName,
      subaccountOwner,
    } = params;

    // Each settlement has a quote & perp balance change, so 2 events per settlement tx
    const limit = requestedLimit + 1;
    const baseResponse = await this.getEvents({
      startCursor,
      maxTimestampInclusive,
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
          tx: event.tx,
          ...subaccountFromHex(event.subaccount),
        };
      })
      .filter((event): event is IndexerSettlementEvent => !!event);

    return this.getPaginationEventsResponse(events, requestedLimit);
  }

  async getPaginatedSubaccountLiquidationEvents(
    params: GetIndexerSubaccountLiquidationEventsParams,
  ): Promise<GetIndexerSubaccountLiquidationEventsResponse> {
    const {
      startCursor,
      maxTimestampInclusive,
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
      maxTimestampInclusive,
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
    params: GetIndexerSubaccountInterestFundingPaymentsParams,
  ): Promise<GetIndexerPaginatedInterestFundingPaymentsResponse> {
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
    params: GetIndexerPaginatedRewardsParams,
  ): Promise<GetIndexerPaginatedRewardsResponse> {
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
   * Paginated blitz points leaderboard query that paginates on rank number.
   *
   * @param params
   */
  async getPaginatedBlitzPointsLeaderboard(
    params: GetIndexerPaginatedBlitzPointsLeaderboardParams,
  ): Promise<GetIndexerPaginatedBlitzPointsLeaderboardResponse> {
    const requestedLimit = params.limit;

    const baseResponse = await this.getBlitzPointsLeaderboard({
      epoch: params.epoch,
      // Query for 1 more result for proper pagination
      limit: requestedLimit + 1,
      // Start cursor is the next rank number
      startCursor: params.startCursor,
    });

    return {
      ...baseResponse,
      // Truncate the response to the requested limit
      positions: baseResponse.positions.slice(0, requestedLimit),
      meta: {
        hasMore: baseResponse.positions.length > requestedLimit,
        // Next cursor is the rank number of the (requestedLimit+1)th item
        nextCursor: baseResponse.positions[requestedLimit]?.rank.toFixed(),
      },
    };
  }

  /**
   * Paginated sonic points leaderboard query that paginates on rank number.
   *
   * @param params
   */
  async getPaginatedSonicPointsLeaderboard(
    params: IndexerPaginationParams,
  ): Promise<GetIndexerPaginatedSonicPointsLeaderboardResponse> {
    const requestedLimit = params.limit;

    const baseResponse = await this.getSonicPointsLeaderboard({
      // Query for 1 more result for proper pagination
      limit: requestedLimit + 1,
      // Start cursor is the next rank number
      startCursor: params.startCursor,
    });

    return {
      ...baseResponse,
      // Truncate the response to the requested limit
      positions: baseResponse.positions.slice(0, requestedLimit),
      meta: {
        hasMore: baseResponse.positions.length > requestedLimit,
        // Next cursor is the rank number of the (requestedLimit+1)th item
        nextCursor: baseResponse.positions[requestedLimit]?.rank.toFixed(),
      },
    };
  }

  /**
   * Paginated leaderboard query that paginates on rank number.
   *
   * @param params
   */
  async getPaginatedLeaderboard(
    params: GetIndexerPaginatedLeaderboardParams,
  ): Promise<GetIndexerPaginatedLeaderboardResponse> {
    const requestedLimit = params.limit;

    const baseResponse = await this.getLeaderboard({
      contestId: params.contestId,
      rankType: params.rankType,
      // Query for 1 more result for proper pagination
      limit: requestedLimit + 1,
      // Start cursor is the next rank number
      startCursor: params.startCursor,
    });

    return {
      ...baseResponse,
      // Truncate the response to the requested limit
      participants: baseResponse.participants.slice(0, requestedLimit),
      meta: {
        hasMore: baseResponse.participants.length > requestedLimit,
        // Next cursor is the rank number of the (requestedLimit+1)th item
        nextCursor:
          params.rankType == 'pnl'
            ? baseResponse.participants[requestedLimit]?.pnlRank.toFixed()
            : baseResponse.participants[requestedLimit]?.roiRank.toFixed(),
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
