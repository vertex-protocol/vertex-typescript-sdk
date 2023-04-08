import { BaseVertexAPI } from '../base';
import {
  CancelOrdersParams,
  CancelProductOrdersParams,
  PlaceOrderParams,
} from './executeTypes';
import { BurnLpParams } from '@vertex-protocol/contracts';
import {
  EngineMintLpParams,
  WithoutNonce,
} from '@vertex-protocol/engine-client';

import { WithoutSubaccountOwner } from '../types';

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
  async placeOrder(params: PlaceOrderParams) {
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
   * Cancels orders through the engine
   * @param params
   */
  async cancelOrders(params: CancelOrdersParams) {
    const sender = await this.getSignerAddress();

    return this.context.engineClient.cancelOrders({
      subaccountOwner: sender,
      verifyingAddr: this.context.contracts.endpoint.address,
      ...params,
    });
  }

  /**
   * Cancels all orders for provided products through the engine.
   * @param params
   */
  async cancelProductOrders(params: CancelProductOrdersParams) {
    const sender = await this.getSignerAddress();

    return this.context.engineClient.cancelProductOrders({
      subaccountOwner: sender,
      verifyingAddr: this.context.contracts.endpoint.address,
      ...params,
    });
  }
}
