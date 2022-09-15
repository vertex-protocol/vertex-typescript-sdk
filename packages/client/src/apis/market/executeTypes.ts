import {
  CancelOrderParams,
  PlaceOrderParams,
} from '@vertex-protocol/engine-client';

export type OrderActionParams = Omit<
  PlaceOrderParams | CancelOrderParams,
  'orderbookAddr'
>;
