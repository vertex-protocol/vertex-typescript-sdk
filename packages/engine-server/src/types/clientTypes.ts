import { OrderParams } from '@vertex-protocol/contracts';

export interface EngineServerClientOpts {
  // Redis Endpoint URL
  url: string;
}

export interface PlaceOrderParams {
  productId: number;
  chainId: number;
  orderbookAddress: string;
  signedOrder: {
    order: OrderParams;
    signature: string;
  };
}

export type CancelOrderParams = PlaceOrderParams;
