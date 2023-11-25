import {
  EngineExecuteCancelOrdersParams,
  EngineExecuteCancelProductOrdersParams,
  EngineExecutePlaceOrderParams,
  EngineOrderParams,
} from '@vertex-protocol/engine-client';
import { OptionalSubaccountOwner } from '../types';
import {
  QueryListTriggerOrdersParams,
  TriggerExecuteCancelOrdersParams,
  TriggerExecuteCancelProductOrdersParams,
  TriggerExecutePlaceOrderParams,
} from '@vertex-protocol/trigger-client';

// TODO This is currently used only for the market API, where speed is more important. This could eventually be used for other executes
export type OptionalSignatureParams<T> = Omit<
  T,
  'verifyingAddr' | 'chainId'
> & {
  verifyingAddr?: string;
  chainId?: number;
};

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

export type GetTriggerOrdersParams =
  OptionalSignatureParams<QueryListTriggerOrdersParams>;
