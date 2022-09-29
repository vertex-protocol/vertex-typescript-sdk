import { PlaceOrderParams } from '@vertex-protocol/engine-client';
import { OrderParams } from '@vertex-protocol/contracts';

export type OrderActionParams = Omit<
  PlaceOrderParams,
  'orderbookAddr' | 'order'
> & {
  order: Omit<OrderParams, 'sender'>;
};
