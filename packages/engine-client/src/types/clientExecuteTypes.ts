import { OrderParams } from '@vertex-protocol/contracts';
import { EngineServerExecutionResult } from './serverExecuteTypes';

export interface PlaceOrderParams {
  productId: number;
  orderbookAddr: string;
  order: OrderParams;
}

export type CancelOrderParams = PlaceOrderParams;

export interface OrderActionResult extends EngineServerExecutionResult {
  digest: string;
}
