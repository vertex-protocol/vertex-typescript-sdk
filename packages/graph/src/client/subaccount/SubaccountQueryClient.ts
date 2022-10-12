import { BaseVertexGraphClient } from '../base';
import {
  GetPaginatedSubaccountEventsParams,
  GetSubaccountEventsByTimeParams,
  GetSubaccountEventsResponse,
  GetSubaccountsParams,
  GetSubaccountsResponse,
  GetSubaccountStateParams,
  GetSubaccountStateResponse,
  GraphSubaccountEvent,
} from './types';
import { getSubaccountEntityId } from '../../utils';
import { nowInSeconds, toBigDecimal } from '@vertex-protocol/utils';

export class SubaccountQueryClient extends BaseVertexGraphClient {
  /**
   * Retrieve all subaccounts for a given address
   *
   * @param params
   */
  async getSubaccountsForAddress(
    params: GetSubaccountsParams,
  ): Promise<GetSubaccountsResponse> {
    const data = await this.graph.SubaccountsForAddress({
      address: params.address,
    });
    return data.subaccounts;
  }

  /**
   * Retrieves the current state of a subaccount on The Graph. Notably, returns balance & trade summaries
   *
   * @param params
   */
  async getSubaccountState(
    params: GetSubaccountStateParams,
  ): Promise<GetSubaccountStateResponse | undefined> {
    const data = await this.graph.SubaccountStateQuery({
      subaccountEntityId: getSubaccountEntityId(params.subaccountId),
    });
    if (data.subaccount == null) {
      return;
    }

    return {
      name: data.subaccount.name,
      spotBalanceSummaries: data.subaccount.spotBalanceSummaries.map(
        (summary) => {
          return {
            productId: Number(summary.productId),
            timeOpened: Number(summary.timeOpened),
            netRealAmount: toBigDecimal(summary.netRealAmount),
            totalNetInterest: toBigDecimal(summary.totalNetInterest),
          };
        },
      ),
      perpBalanceSummaries: data.subaccount.perpBalanceSummaries.map(
        (summary) => {
          return {
            productId: Number(summary.productId),
            timeOpened: Number(summary.timeOpened),
            vQuoteWithoutFunding: toBigDecimal(summary.vQuoteWithoutFunding),
            totalNetFunding: toBigDecimal(summary.totalNetFunding),
          };
        },
      ),
    };
  }

  /**
   * Retrieves on-chain events for a given subaccount based on time
   *
   * @param params
   */
  async getSubaccountPaginatedEvents(
    params: GetPaginatedSubaccountEventsParams,
  ): Promise<GetSubaccountEventsResponse> {
    const baseResponse: GetSubaccountEventsResponse = {
      cancelOrderEvents: [],
      liquidationEvents: [],
      makerFillOrderEvents: [],
      modifyCollateralEvents: [],
      reportOrderEvents: [],
      settlePnlEvents: [],
      takerFillOrderEvents: [],
    };

    const baseQueryVariables = {
      subaccountEntityId: getSubaccountEntityId(params.subaccountId),
      maxTimeExclusive: nowInSeconds(),
      minTimeInclusive: 0,
      skip: params.skip,
    };
    switch (params.type) {
      // Separate queries for fills
      case 'maker_fill_order':
        const makerEventData =
          await this.graph.SubaccountMakerFillEventHistoryQuery({
            ...baseQueryVariables,
            limit: params.first,
          });
        return {
          ...baseResponse,
          makerFillOrderEvents: makerEventData.fillOrderEvents,
        };
      case 'taker_fill_order':
        const takerEventData =
          await this.graph.SubaccountTakerFillEventHistoryQuery({
            ...baseQueryVariables,
            limit: params.first,
          });
        return {
          ...baseResponse,
          takerFillOrderEvents: takerEventData.fillOrderEvents,
        };
      default:
        const baseHistoryQueryData =
          await this.graph.SubaccountEventHistoryQuery({
            ...baseQueryVariables,
            // Unfortunately need to pass in a non-zero limit for query to work
            // need to rethink this
            liquidateeLimit: params.type === 'liquidatee' ? params.first : 0,
            modifyCollateralLimit:
              params.type === 'modify_collateral' ? params.first : 0,
            settlePnlLimit: params.type === 'settle_pnl' ? params.first : 0,
            reportOrderLimit: params.type === 'report_order' ? params.first : 0,
            cancelOrderLimit: params.type === 'cancel_order' ? params.first : 0,
          });
        return {
          ...baseResponse,
          ...baseHistoryQueryData,
        };
    }
  }

  /**
   * Retrieves on-chain events for a given subaccount based on time
   *
   * @param params
   */
  async getSubaccountEventsByTime(
    params: GetSubaccountEventsByTimeParams,
  ): Promise<GetSubaccountEventsResponse> {
    const baseQueryVariables = {
      subaccountEntityId: getSubaccountEntityId(params.subaccountId),
      maxTimeExclusive: params.maxTimeExclusive ?? nowInSeconds(),
      minTimeInclusive: params.minTimeInclusive ?? 0,
    };

    const baseHistoryQueryData = await this.graph.SubaccountEventHistoryQuery({
      ...baseQueryVariables,
      // Filter by limit
      liquidateeLimit: toEventLimitField(
        'liquidatee',
        params.includeEventTypes,
      ),
      modifyCollateralLimit: toEventLimitField(
        'modify_collateral',
        params.includeEventTypes,
      ),
      settlePnlLimit: toEventLimitField('settle_pnl', params.includeEventTypes),
      reportOrderLimit: 0, // Disabled for now
      cancelOrderLimit: toEventLimitField(
        'cancel_order',
        params.includeEventTypes,
      ),
    });
    const response: GetSubaccountEventsResponse = {
      ...baseHistoryQueryData,
      takerFillOrderEvents: [],
      makerFillOrderEvents: [],
    };

    // Need to query taker & maker fill events separately
    const takerFillEventLimit = toEventLimitField(
      'taker_fill_order',
      params.includeEventTypes,
    );
    const makerFillEventLimit = toEventLimitField(
      'maker_fill_order',
      params.includeEventTypes,
    );
    if (takerFillEventLimit === undefined) {
      const takerEventData =
        await this.graph.SubaccountTakerFillEventHistoryQuery(
          baseQueryVariables,
        );
      response.takerFillOrderEvents = takerEventData.fillOrderEvents;
    }
    if (makerFillEventLimit === undefined) {
      const makerEventData =
        await this.graph.SubaccountMakerFillEventHistoryQuery(
          baseQueryVariables,
        );
      response.makerFillOrderEvents = makerEventData.fillOrderEvents;
    }

    return response;
  }
}

function toEventLimitField(
  eventType: GraphSubaccountEvent,
  includeEventTypes?: GraphSubaccountEvent[],
) {
  if (!includeEventTypes) {
    return;
  }
  // Either an unspecified limit (i.e. retrieve all), or 0 (retrieve none)
  return includeEventTypes.includes(eventType) ? undefined : 0;
}
