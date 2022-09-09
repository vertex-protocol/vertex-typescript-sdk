import { OrderParams } from '@vertex-protocol/contracts';
import { ExecuteResultKey } from './clientTypes';

export interface PlaceOrderParams {
  productId: number;
  orderbookAddr: string;
  order: OrderParams;
}

export type CancelOrderParams = PlaceOrderParams;

export interface OrderActionResult {
  digest: string;
  executeResultKey: ExecuteResultKey;
}
