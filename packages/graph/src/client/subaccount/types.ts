import {
  SubaccountModifyCollateralEventHistoryQueryQuery,
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

export type GraphSubaccountEvent =
  | 'cancel_order'
  | 'maker_fill_order'
  | 'taker_fill_order'
  | 'liquidatee'
  | 'modify_collateral'
  | 'report_order'
  | 'settle_pnl';

export interface GetPaginatedSubaccountModifyCollateralEventsParams
  extends PaginationParams {
  subaccountId: number;
  // UNIX timestamp in seconds
  minTimeInclusive?: number;
  // UNIX timestamp in seconds
  maxTimeExclusive?: number;
}

export type GetPaginatedSubaccountModifyCollateralEventsResponse =
  SubaccountModifyCollateralEventHistoryQueryQuery['modifyCollateralEvents'];
