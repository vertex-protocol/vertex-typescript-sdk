import { BaseVertexGraphClient } from '../base';
import {
  GetSubaccountEventsParams,
  GetSubaccountEventsResponse,
  GetSubaccountsParams,
  GetSubaccountsResponse,
  GetSubaccountStateParams,
  GetSubaccountStateResponse,
  GraphSubaccountEvent,
} from './types';
import { getSubaccountEntityId } from '../../utils';
import { nowInSeconds } from '@vertex-protocol/utils';

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
  ): Promise<GetSubaccountStateResponse> {
    const data = await this.graph.SubaccountStateQuery({
      subaccountEntityId: getSubaccountEntityId(params.subaccountId),
    });
    return data.subaccount;
  }

  /**
   * Retrieves on-chain events for a given subaccount
   *
   * @param params
   */
  async getSubaccountEvents(
    params: GetSubaccountEventsParams,
  ): Promise<GetSubaccountEventsResponse> {
    const data = await this.graph.SubaccountEventHistoryQuery({
      subaccountEntityId: getSubaccountEntityId(params.subaccountId),
      maxTimeExclusive: params.maxTimeExclusive ?? nowInSeconds(),
      minTimeInclusive: params.minTimeInclusive ?? 0,
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
    // TODO: Separate queries for taker & maker events

    return data;
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
