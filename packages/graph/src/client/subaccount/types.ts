import {
  SubaccountLiquidationEventHistoryQueryQuery,
  SubaccountModifyCollateralEventHistoryQueryQuery,
  SubaccountSettlementEventHistoryQueryQuery,
  SubaccountsForAddressQuery,
} from '../../generated';
import { BigDecimal } from '@vertex-protocol/utils';
import { PaginationParams } from '../types';

export interface GetSubaccountsParams {
  address: string;
}

export type GetSubaccountsResponse = SubaccountsForAddressQuery['subaccounts'];

export interface GetSubaccountStateParams {
  subaccountId: number;
}

export interface GetSubaccountStateResponse {
  name: string;
  spotBalanceSummaries: {
    productId: number;
    timeOpened: number;
    netRealAmount: BigDecimal;
    totalNetInterest: BigDecimal;
  }[];
  perpBalanceSummaries: {
    productId: number;
    timeOpened: number;
    vQuoteWithoutFunding: BigDecimal;
    totalNetFunding: BigDecimal;
  }[];
  tradeSummaries: {
    productId: number;
    totalEntryQuoteAmountAbs: BigDecimal;
    totalEntryAmountAbs: BigDecimal;
    totalCloseQuoteAmountAbs: BigDecimal;
    totalCloseAmountAbs: BigDecimal;
  }[];
}

export interface PaginatedSubaccountEventsParams extends PaginationParams {
  subaccountId: number;
  // UNIX timestamp in seconds
  minTimeInclusive?: number;
  // UNIX timestamp in seconds
  maxTimeExclusive?: number;
}

export type GetPaginatedSubaccountModifyCollateralEventsResponse =
  SubaccountModifyCollateralEventHistoryQueryQuery['modifyCollateralEvents'];

export type GetPaginatedSubaccountLiquidationEventsResponse =
  SubaccountLiquidationEventHistoryQueryQuery['liquidationEvents'];

export type GetPaginatedSubaccountSettlementEventsResponse =
  SubaccountSettlementEventHistoryQueryQuery['settlePnlEvents'];
