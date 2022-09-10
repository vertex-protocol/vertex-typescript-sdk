import { OrderParams } from '@vertex-protocol/contracts';

export interface PlaceOrderParams {
  productId: number;
  orderbookAddr: string;
  order: OrderParams;
}

export type CancelOrderParams = PlaceOrderParams;
