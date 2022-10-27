import { BaseVertexGraphClient } from '../base';
import {
  GetPaginatedSubaccountModifyCollateralEventsParams,
  GetPaginatedSubaccountModifyCollateralEventsResponse,
  GetSubaccountsParams,
  GetSubaccountsResponse,
  GetSubaccountStateParams,
  GetSubaccountStateResponse,
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
      tradeSummaries: data.subaccount.tradeSummaries.map((summary) => {
        return {
          productId: Number(summary.productId),
          totalEntryQuoteAmountAbs: toBigDecimal(
            summary.totalEntryQuoteAmountAbs,
          ),
          totalEntryAmountAbs: toBigDecimal(summary.totalEntryAmountAbs),
          totalCloseQuoteAmountAbs: toBigDecimal(
            summary.totalCloseQuoteAmountAbs,
          ),
          totalCloseAmountAbs: toBigDecimal(summary.totalCloseAmountAbs),
        };
      }),
    };
  }

  /**
   * Retrieves on-chain modify collateral events for a given subaccount
   *
   * @param params
   */
  async getSubaccountPaginatedModifyCollateralEvents(
    params: GetPaginatedSubaccountModifyCollateralEventsParams,
  ): Promise<GetPaginatedSubaccountModifyCollateralEventsResponse> {
    const baseResponse =
      await this.graph.SubaccountModifyCollateralEventHistoryQuery({
        subaccountEntityId: getSubaccountEntityId(params.subaccountId),
        maxTimeExclusive: params.maxTimeExclusive ?? nowInSeconds(),
        minTimeInclusive: params.minTimeInclusive ?? 0,
        skip: params.skip,
        first: params.first,
      });
    return baseResponse.modifyCollateralEvents;
  }
}
