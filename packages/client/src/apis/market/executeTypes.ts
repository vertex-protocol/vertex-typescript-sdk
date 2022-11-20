import {
  OrderParamsWithoutNonce,
  PlaceOrderParams,
} from '@vertex-protocol/engine-client';

export type OrderActionParams = Omit<
  PlaceOrderParams,
  'orderbookAddr' | 'order'
> & {
  order: Omit<OrderParamsWithoutNonce, 'sender'>;
};
