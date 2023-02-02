import { BaseVertexGraphClient } from '../base';
import {
  GetPaginatedSubaccountLiquidationEventsResponse,
  GetPaginatedSubaccountModifyCollateralEventsResponse,
  GetPaginatedSubaccountSettlementEventsResponse,
  GetSubaccountsParams,
  GetSubaccountsResponse,
  GetSubaccountStateParams,
  GetSubaccountStateResponse,
  PaginatedSubaccountEventsParams,
  PaginatedSubaccountOrderFillsParams,
  PaginatedSubaccountOrderFillsResponse,
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
      subaccountEntityId: getSubaccountEntityId(
        params.subaccountOwner,
        params.subaccountName,
      ),
    });
    if (data.subaccount == null) {
      return {
        name: '',
        perpBalanceSummaries: [],
        spotBalanceSummaries: [],
        tradeSummaries: [],
      };
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
    params: PaginatedSubaccountEventsParams,
  ): Promise<GetPaginatedSubaccountModifyCollateralEventsResponse> {
    const baseResponse =
      await this.graph.SubaccountModifyCollateralEventHistoryQuery({
        subaccountEntityId: getSubaccountEntityId(
          params.subaccountOwner,
          params.subaccountName,
        ),
        maxTimeExclusive: params.maxTimeExclusive ?? nowInSeconds(),
        minTimeInclusive: params.minTimeInclusive ?? 0,
        skip: params.skip,
        first: params.first,
      });
    return baseResponse.modifyCollateralEvents;
  }

  /**
   * Retrieves on-chain liquidation events for a given subaccount
   *
   * @param params
   */
  async getSubaccountPaginatedLiquidationEvents(
    params: PaginatedSubaccountEventsParams,
  ): Promise<GetPaginatedSubaccountLiquidationEventsResponse> {
    const baseResponse =
      await this.graph.SubaccountLiquidationEventHistoryQuery({
        subaccountEntityId: getSubaccountEntityId(
          params.subaccountOwner,
          params.subaccountName,
        ),
        maxTimeExclusive: params.maxTimeExclusive ?? nowInSeconds(),
        minTimeInclusive: params.minTimeInclusive ?? 0,
        skip: params.skip,
        first: params.first,
      });
    return baseResponse.liquidationEvents;
  }

  /**
   * Retrieves on-chain settlement events for a given subaccount
   *
   * @param params
   */
  async getSubaccountPaginatedSettlementEvents(
    params: PaginatedSubaccountEventsParams,
  ): Promise<GetPaginatedSubaccountSettlementEventsResponse> {
    const baseResponse = await this.graph.SubaccountSettlementEventHistoryQuery(
      {
        subaccountEntityId: getSubaccountEntityId(
          params.subaccountOwner,
          params.subaccountName,
        ),
        maxTimeExclusive: params.maxTimeExclusive ?? nowInSeconds(),
        minTimeInclusive: params.minTimeInclusive ?? 0,
        skip: params.skip,
        first: params.first,
      },
    );
    return baseResponse.settlePnlEvents;
  }

  /**
   * Retrieves on-chain order fills for a given subaccount
   *
   * @param params
   */
  async getPaginatedSubaccountOrderFillEvents(
    params: PaginatedSubaccountOrderFillsParams,
  ): Promise<PaginatedSubaccountOrderFillsResponse> {
    const baseResponse = await this.graph.SubaccountOrderFillsQuery({
      subaccountEntityId: getSubaccountEntityId(
        params.subaccountOwner,
        params.subaccountName,
      ),
      skip: params.skip,
      first: params.first,
    });
    return baseResponse.fillOrderEvents;
  }
}
