import { OrderParams } from '@vertex-protocol/contracts';
import { EngineServerExecutionResult } from './serverExecuteTypes';

export type WithoutNonce<T extends { nonce: unknown }> = Omit<T, 'nonce'>;

export type OrderParamsWithoutNonce = WithoutNonce<OrderParams>;

export interface PlaceOrderParams {
  productId: number;
  orderbookAddr: string;
  order: OrderParams;
}

export type PlaceOrderParamsWithoutNonce = Omit<PlaceOrderParams, 'order'> & {
  order: OrderParamsWithoutNonce;
};

export interface OrderActionResult extends EngineServerExecutionResult {
  digest: string;
}
