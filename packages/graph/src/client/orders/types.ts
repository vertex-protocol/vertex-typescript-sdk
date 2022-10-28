import {
  OrderByDigestQueryQuery,
  PaginatedAllMarketOrdersQueryQuery,
  PaginatedSubaccountOrdersForProductsQueryQuery,
  PaginatedSubaccountOrdersQueryQuery,
} from '../../generated';
import { PaginationParams } from '../types';
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

export interface SubaccountOrdersForProductsParams extends PaginationParams {
  subaccountId: number;
  productIds: number[];
}

export type SubaccountOrdersForProductsResponse =
  PaginatedSubaccountOrdersForProductsQueryQuery['orders'];

export interface OrderByDigestParams {
  productId: number;
  digest: string;
}

type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

export type OrderByDigestResponse = ArrayElement<
  OrderByDigestQueryQuery['orders']
>;
