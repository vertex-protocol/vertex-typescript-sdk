import {
  EngineBurnLpParams,
  EngineCancelOrdersParams,
  EngineCancelProductOrdersParams,
  EngineMintLpParams,
  EngineOrderParams,
  EnginePlaceOrderParams,
} from '@vertex-protocol/engine-client';
import {
  TriggerCancelOrdersParams,
  TriggerCancelProductOrdersParams,
  TriggerListOrdersParams,
  TriggerPlaceOrderParams,
} from '@vertex-protocol/trigger-client';
import { OptionalSignatureParams, OptionalSubaccountOwner } from '../types';

type ClientOrderParams<T> = Omit<OptionalSignatureParams<T>, 'order'> & {
  order: OptionalSubaccountOwner<EngineOrderParams>;
};

export type PlaceOrderParams = ClientOrderParams<EnginePlaceOrderParams>;

export type CancelOrdersParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineCancelOrdersParams>
>;

export type CancelProductOrdersParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineCancelProductOrdersParams>
>;

export interface CancelAndPlaceOrderParams {
  placeOrder: PlaceOrderParams;
  cancelOrders: CancelOrdersParams;
}

export type PlaceTriggerOrderParams =
  ClientOrderParams<TriggerPlaceOrderParams>;

export type CancelTriggerOrdersParams = OptionalSignatureParams<
  OptionalSubaccountOwner<TriggerCancelOrdersParams>
>;

export type CancelTriggerProductOrdersParams = OptionalSignatureParams<
  OptionalSubaccountOwner<TriggerCancelProductOrdersParams>
>;

export type MintLpParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineMintLpParams>
>;

export type BurnLpParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineBurnLpParams>
>;

export type GetTriggerOrdersParams =
  OptionalSignatureParams<TriggerListOrdersParams>;
