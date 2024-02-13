import {
  EngineExecuteBurnLpParams,
  EngineExecuteCancelOrdersParams,
  EngineExecuteCancelProductOrdersParams,
  EngineExecuteMintLpParams,
  EngineExecutePlaceOrderParams,
  EngineOrderParams,
} from '@vertex-protocol/engine-client';
import { OptionalSignatureParams, OptionalSubaccountOwner } from '../types';
import {
  QueryListTriggerOrdersParams,
  TriggerExecuteCancelOrdersParams,
  TriggerExecuteCancelProductOrdersParams,
  TriggerExecutePlaceOrderParams,
} from '@vertex-protocol/trigger-client';

type ClientOrderParams<T> = Omit<OptionalSignatureParams<T>, 'order'> & {
  order: OptionalSubaccountOwner<EngineOrderParams>;
};

export type PlaceOrderParams = ClientOrderParams<EngineExecutePlaceOrderParams>;

export type CancelOrdersParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineExecuteCancelOrdersParams>
>;

export type CancelProductOrdersParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineExecuteCancelProductOrdersParams>
>;

export interface CancelAndPlaceOrderParams {
  placeOrder: PlaceOrderParams;
  cancelOrders: CancelOrdersParams;
}

export type PlaceTriggerOrderParams =
  ClientOrderParams<TriggerExecutePlaceOrderParams>;

export type CancelTriggerOrdersParams = OptionalSignatureParams<
  OptionalSubaccountOwner<TriggerExecuteCancelOrdersParams>
>;

export type CancelTriggerProductOrdersParams = OptionalSignatureParams<
  OptionalSubaccountOwner<TriggerExecuteCancelProductOrdersParams>
>;

export type MintLpParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineExecuteMintLpParams>
>;

export type BurnLpParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineExecuteBurnLpParams>
>;

export type GetTriggerOrdersParams =
  OptionalSignatureParams<QueryListTriggerOrdersParams>;
