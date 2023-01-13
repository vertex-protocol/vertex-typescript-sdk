import { BaseVertexAPI } from '../base';
import { OrderActionParams } from './executeTypes';
import {
  BurnLpParams,
  OrderCancellationParams,
} from '@vertex-protocol/contracts';
import {
  EngineMintLpParams,
  WithoutNonce,
} from '@vertex-protocol/engine-client';
import { WithoutSender } from '../spot/BaseSpotAPI';

export class MarketExecuteAPI extends BaseVertexAPI {
  /**
   * Mint LP tokens through engine
   * @param params
   */
  async mintLp(params: WithoutSender<WithoutNonce<EngineMintLpParams>>) {
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
  async burnLp(params: WithoutSender<WithoutNonce<BurnLpParams>>) {
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
  async cancelOrder(
    params: WithoutSender<WithoutNonce<OrderCancellationParams>>,
  ) {
    const sender = (await this.context.engineSigner?.getAddress()) ?? '';

    return this.context.engineClient.cancelOrder({
      sender,
      endpointAddr: this.context.contracts.endpoint.address,
      ...params,
    });
  }

  private getOrderbookAddress(productId: number) {
    return this.context.contracts.clearinghouse.getOrderbook(productId);
  }
}
