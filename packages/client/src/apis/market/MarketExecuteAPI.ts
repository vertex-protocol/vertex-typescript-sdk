import { BaseVertexAPI } from '../base';
import { OrderActionParams } from './executeTypes';

export class MarketExecuteAPI extends BaseVertexAPI {
  /**
   * Places an order through the engine
   * @param params
   */
  async placeOrder(params: OrderActionParams) {
    const { productId, order } = params;
    const orderbookAddr = await this.getOrderbookAddress(productId);
    return this.context.engineClient.placeOrder({
      order: {
        ...order,
        sender: (await this.context.engineSigner?.getAddress()) ?? '',
      },
      orderbookAddr,
      productId,
    });
  }

  /**
   * Cancels an order through the engine
   * @param params
   */
  async cancelOrder(params: OrderActionParams) {
    const { productId, order } = params;
    const orderbookAddr = await this.getOrderbookAddress(productId);
    return this.context.engineClient.cancelOrder({
      order: {
        ...order,
        sender: (await this.context.engineSigner?.getAddress()) ?? '',
      },
      orderbookAddr,
      productId,
    });
  }

  private getOrderbookAddress(productId: number) {
    return this.context.contracts.clearinghouse.getOrderbook(productId);
  }
}
