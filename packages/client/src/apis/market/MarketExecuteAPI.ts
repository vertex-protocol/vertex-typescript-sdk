import { BaseVertexAPI } from '../base';
import {
  CancelOrderParams,
  PlaceOrderParams,
} from '@vertex-protocol/engine-client';

export type OrderActionParams = Omit<
  PlaceOrderParams | CancelOrderParams,
  'orderbookAddr'
>;

export class MarketExecuteAPI extends BaseVertexAPI {
  async placeOrder(params: OrderActionParams) {
    const { productId, order } = params;
    const orderbookAddr = await this.getOrderbookAddress(productId);
    return this.context.engineClient.placeOrder({
      order,
      orderbookAddr,
      productId,
    });
  }

  async cancelOrder(params: OrderActionParams) {
    const { productId, order } = params;
    const orderbookAddr = await this.getOrderbookAddress(productId);
    return this.context.engineClient.cancelOrder({
      order,
      orderbookAddr,
      productId,
    });
  }

  private getOrderbookAddress(productId: number) {
    return this.context.contracts.clearinghouse.getOrderbook(productId);
  }
}
