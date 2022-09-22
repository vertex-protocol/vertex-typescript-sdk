import {
  OnBookOrdersByIDQueryQuery,
  PaginatedAllMarketOrdersQueryQuery,
  PaginatedSubaccountOrdersQueryQuery,
} from '../../generated';
import { PaginationParams } from '../types';
import { OrderbookID } from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';

interface LatestOrderFill {
  // UNIX Seconds
  time: number;
  takeAmountDelta: BigDecimal;
  price: BigDecimal;
}

export interface LatestOrderFillsParams {
  productId: number;
}

export type LatestOrderFillsResponse = LatestOrderFill[];

export interface AllMarketOrdersParams extends PaginationParams {
  productId: number;
}

export type AllMarketOrdersResponse =
  PaginatedAllMarketOrdersQueryQuery['orders'];

export interface SubaccountOrdersParams extends PaginationParams {
  subaccountId: number;
}

export type SubaccountOrdersResponse =
  PaginatedSubaccountOrdersQueryQuery['orders'];

export interface OrdersByIdParams {
  ids: {
    productId: number;
    orderbookId: OrderbookID;
  }[];
}

export type OrdersByIdResponse = OnBookOrdersByIDQueryQuery['orders'];
