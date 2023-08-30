import {
  EngineExecutePlaceOrderParams,
  EngineExecuteCancelAndPlaceParams,
  EngineOrderParams,
  EngineExecuteCancelOrdersParams,
} from '@vertex-protocol/engine-client';
import { WithoutSubaccountOwner } from '../types';
import {
  QueryListTriggerOrdersParams,
  TriggerExecuteCancelOrdersParams,
  TriggerExecuteCancelProductOrdersParams,
  TriggerExecutePlaceOrderParams,
} from '@vertex-protocol/trigger-client';

type ClientOrderParams<T> = Omit<T, 'order'> & {
  order: WithoutSubaccountOwner<EngineOrderParams>;
};

type OmitVerifyingAddr<T> = Omit<T, 'verifyingAddr'>;

type OptionalVerifyingAddr<T> = OmitVerifyingAddr<T> & {
  verifyingAddr?: string;
};

export type PlaceOrderParams = ClientOrderParams<EngineExecutePlaceOrderParams>;

export type CancelAndPlaceOrderParams = Omit<
  EngineExecuteCancelAndPlaceParams,
  'placeOrder' | 'cancelOrders'
> & {
  placeOrder: PlaceOrderParams;
  cancelOrders: WithoutSubaccountOwner<EngineExecuteCancelOrdersParams>;
};

// Make verifyingAddr optional here to be consistent with engine
export type PlaceTriggerOrderParams = OptionalVerifyingAddr<
  ClientOrderParams<TriggerExecutePlaceOrderParams>
>;

export type CancelTriggerOrdersParams = OptionalVerifyingAddr<
  WithoutSubaccountOwner<TriggerExecuteCancelOrdersParams>
>;

export type CancelTriggerProductOrdersParams = OptionalVerifyingAddr<
  WithoutSubaccountOwner<TriggerExecuteCancelProductOrdersParams>
>;

export type GetTriggerOrdersParams =
  OmitVerifyingAddr<QueryListTriggerOrdersParams>;
