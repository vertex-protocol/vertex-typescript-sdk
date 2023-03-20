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
import { WithoutSubaccountOwner } from '../spot/BaseSpotAPI';

export class MarketExecuteAPI extends BaseVertexAPI {
  /**
   * Mint LP tokens through engine
   * @param params
   */
  async mintLp(
    params: WithoutSubaccountOwner<WithoutNonce<EngineMintLpParams>>,
  ) {
    const sender = (await this.context.engineSigner?.getAddress()) ?? '';

    return this.context.engineClient.mintLp({
      endpointAddr: this.context.contracts.endpoint.address,
      subaccountOwner: sender,
      ...params,
    });
  }

  /**
   * Burn LP tokens through engine
   * @param params
   */
  async burnLp(params: WithoutSubaccountOwner<WithoutNonce<BurnLpParams>>) {
    const sender = (await this.context.engineSigner?.getAddress()) ?? '';

    return this.context.engineClient.burnLp({
      endpointAddr: this.context.contracts.endpoint.address,
      subaccountOwner: sender,
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
        subaccountOwner: (await this.context.engineSigner?.getAddress()) ?? '',
      },
      orderbookAddr,
      productId,
      spotLeverage: params.spotLeverage,
    });
  }

  /**
   * Cancels an order through the engine
   * @param params
   */
  async cancelOrder(
    params: WithoutSubaccountOwner<WithoutNonce<OrderCancellationParams>>,
  ) {
    const sender = (await this.context.engineSigner?.getAddress()) ?? '';

    return this.context.engineClient.cancelOrder({
      subaccountOwner: sender,
      endpointAddr: this.context.contracts.endpoint.address,
      ...params,
    });
  }

  private async getOrderbookAddress(productId: number) {
    const contracts = await this.context.engineClient.getContracts();
    return contracts.orderbookAddrs[productId];
  }
}
