import {
  EngineExecutePlaceOrderParams,
  EngineOrderParams,
  WithoutNonce,
} from '@vertex-protocol/engine-client';
import { WithoutSubaccountOwner } from '../types';
import {
  OrderCancellationParams,
  ProductOrdersCancellationParams,
} from '@vertex-protocol/contracts';

export type PlaceOrderParams = Omit<EngineExecutePlaceOrderParams, 'order'> & {
  order: Omit<EngineOrderParams, 'subaccountOwner'>;
  nonce?: string;
};

export type CancelOrdersParams = WithoutSubaccountOwner<
  WithoutNonce<OrderCancellationParams>
> & {
  nonce?: string;
};

export type CancelProductOrdersParams = WithoutSubaccountOwner<
  WithoutNonce<ProductOrdersCancellationParams>
> & {
  nonce?: string;
};
