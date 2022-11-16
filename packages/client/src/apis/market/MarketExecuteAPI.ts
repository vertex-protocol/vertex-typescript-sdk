import { BaseVertexAPI } from '../base';
import { OrderActionParams } from './executeTypes';
import { BurnLpParams, MintLpParams } from '@vertex-protocol/contracts';

export class MarketExecuteAPI extends BaseVertexAPI {
  /**
   * Mint LP tokens through engine
   * @param params
   */
  async mintLp(params: Omit<MintLpParams, 'sender'>) {
    const sender = (await this.context.engineSigner?.getAddress()) ?? '';

    return this.context.engineClient.mintLp({
      endpointAddr: this.context.contracts.endpoint.address,
      sender,
      ...params,
    });
  }

  /**
   * Burn LP tokens through engine
   * @param params
   */
  async burnLp(params: Omit<BurnLpParams, 'sender'>) {
    const sender = (await this.context.engineSigner?.getAddress()) ?? '';

    return this.context.engineClient.burnLp({
      endpointAddr: this.context.contracts.endpoint.address,
      sender,
      ...params,
    });
  }

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
