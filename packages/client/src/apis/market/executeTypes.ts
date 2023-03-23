import {
  EngineOrderParams,
  EngineExecutePlaceOrderParams,
} from '@vertex-protocol/engine-client';

export type OrderActionParams = Omit<EngineExecutePlaceOrderParams, 'order'> & {
  order: Omit<EngineOrderParams, 'subaccountOwner'>;
  nonce?: string;
};
