import {
  EngineExecutePlaceOrderParams,
  EngineOrderParams,
} from '@vertex-protocol/engine-client';

export type PlaceOrderParams = Omit<EngineExecutePlaceOrderParams, 'order'> & {
  order: Omit<EngineOrderParams, 'subaccountOwner'>;
};
