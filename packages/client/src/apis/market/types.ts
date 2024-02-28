import {
  EngineExecuteBurnLpParams,
  EngineExecuteCancelOrdersParams,
  EngineExecuteCancelProductOrdersParams,
  EngineExecuteMintLpParams,
  EngineExecutePlaceOrderParams,
  EngineOrderParams,
} from '@vertex-protocol/engine-client';
import {
  TriggerExecuteCancelOrdersParams,
  TriggerExecuteCancelProductOrdersParams,
  TriggerExecutePlaceOrderParams,
  TriggerQueryListTriggerOrdersParams,
} from '@vertex-protocol/trigger-client';
import { OptionalSignatureParams, OptionalSubaccountOwner } from '../types';

type ClientOrderParams<T> = Omit<OptionalSignatureParams<T>, 'order'> & {
  order: OptionalSubaccountOwner<EngineOrderParams>;
};

export type ExecutePlaceOrderParams =
  ClientOrderParams<EngineExecutePlaceOrderParams>;

export type ExecuteCancelOrdersParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineExecuteCancelOrdersParams>
>;

export type ExecuteCancelProductOrdersParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineExecuteCancelProductOrdersParams>
>;

export interface ExecuteCancelAndPlaceOrderParams {
  placeOrder: ExecutePlaceOrderParams;
  cancelOrders: ExecuteCancelOrdersParams;
}

export type ExecutePlaceTriggerOrderParams =
  ClientOrderParams<TriggerExecutePlaceOrderParams>;

export type ExecuteCancelTriggerOrdersParams = OptionalSignatureParams<
  OptionalSubaccountOwner<TriggerExecuteCancelOrdersParams>
>;

export type ExecuteCancelTriggerProductOrdersParams = OptionalSignatureParams<
  OptionalSubaccountOwner<TriggerExecuteCancelProductOrdersParams>
>;

export type ExecuteMintLpParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineExecuteMintLpParams>
>;

export type ExecuteBurnLpParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineExecuteBurnLpParams>
>;

export type QueryListTriggerOrdersParams =
  OptionalSignatureParams<TriggerQueryListTriggerOrdersParams>;
