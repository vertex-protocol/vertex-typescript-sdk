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
    const sender = await this.getSignerAddress();

    return this.context.engineClient.mintLp({
      verifyingAddr: this.context.contracts.endpoint.address,
      subaccountOwner: sender,
      ...params,
    });
  }

  /**
   * Burn LP tokens through engine
   * @param params
   */
  async burnLp(params: WithoutSubaccountOwner<WithoutNonce<BurnLpParams>>) {
    const sender = await this.getSignerAddress();

    return this.context.engineClient.burnLp({
      verifyingAddr: this.context.contracts.endpoint.address,
      subaccountOwner: sender,
      ...params,
    });
  }

  /**
   * Places an order through the engine
   * @param params
   */
  async placeOrder(params: OrderActionParams) {
    const { productId, order, nonce } = params;
    const orderbookAddr = await this.context.engineClient.getOrderbookAddress(
      productId,
    );
    return this.context.engineClient.placeOrder({
      order: {
        ...order,
        subaccountOwner: await this.getSignerAddress(),
      },
      verifyingAddr: orderbookAddr,
      productId,
      spotLeverage: params.spotLeverage,
      nonce,
    });
  }

  /**
   * Cancels an order through the engine
   * @param params
   */
  async cancelOrder(
    params: WithoutSubaccountOwner<WithoutNonce<OrderCancellationParams>>,
  ) {
    const sender = await this.getSignerAddress();

    return this.context.engineClient.cancelOrders({
      subaccountOwner: sender,
      verifyingAddr: this.context.contracts.endpoint.address,
      ...params,
    });
  }
}
