import {
  OnBookOrdersByIDQueryQuery,
  OrderStatus,
  PaginatedAllMarketOrdersQueryQuery,
  PaginatedSubaccountOrdersQueryQuery,
} from '../../generated';
import { PaginationParams } from '../types';
import { OrderbookID } from '@vertex-protocol/contracts';

export interface AllMarketOrdersParams extends PaginationParams {
  productId: number;
  // Allowed order statuses, if not given, defaults to all
  statuses?: OrderStatus[];
}

export type AllMarketOrdersResponse =
  PaginatedAllMarketOrdersQueryQuery['orders'];

export interface SubaccountOrdersParams extends PaginationParams {
  subaccountId: number;
  // Allowed order statuses, if not given, defaults to all
  statuses?: OrderStatus[];
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
