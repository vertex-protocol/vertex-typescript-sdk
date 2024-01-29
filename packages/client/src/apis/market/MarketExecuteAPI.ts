import { BaseVertexAPI } from '../base';
import {
  CancelAndPlaceOrderParams,
  CancelOrdersParams,
  CancelProductOrdersParams,
  CancelTriggerOrdersParams,
  CancelTriggerProductOrdersParams,
  OptionalSignatureParams,
  PlaceOrderParams,
  PlaceTriggerOrderParams,
} from './types';
import {
  EngineExecuteBurnLpParams,
  EngineExecuteMintLpParams,
} from '@vertex-protocol/engine-client';

import { OptionalSubaccountOwner } from '../types';

export class MarketExecuteAPI extends BaseVertexAPI {
  /**
   * Mint LP tokens through engine
   * @param params
   */
  async mintLp(params: OptionalSubaccountOwner<EngineExecuteMintLpParams>) {
    return this.context.engineClient.mintLp({
      ...params,
      chainId: await this.getSignerChainId(),
      verifyingAddr: this.getEndpointAddress(),
      subaccountOwner: await this.getSubaccountOwnerIfNeeded(params),
    });
  }

  /**
   * Burn LP tokens through engine
   * @param params
   */
  async burnLp(params: OptionalSubaccountOwner<EngineExecuteBurnLpParams>) {
    return this.context.engineClient.burnLp({
      ...params,
      chainId: await this.getSignerChainId(),
      verifyingAddr: this.getEndpointAddress(),
      subaccountOwner: await this.getSubaccountOwnerIfNeeded(params),
    });
  }

  /**
   * Places an order through the engine
   * @param params
   */
  async placeOrder(params: PlaceOrderParams) {
    const { id: orderId, productId, order, nonce } = params;

    return this.context.engineClient.placeOrder({
      id: orderId,
      order: {
        ...order,
        subaccountOwner: await this.getSubaccountOwnerIfNeeded(params.order),
      },
      chainId: await this.getSignerChainIdIfNeeded(params),
      verifyingAddr: await this.getOrderbookVerifyingAddressIfNeeded(params),
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
    return this.context.engineClient.cancelOrders({
      ...params,
      chainId: await this.getSignerChainIdIfNeeded(params),
      subaccountOwner: await this.getSubaccountOwnerIfNeeded(params),
      verifyingAddr: this.getEndpointAddress(),
    });
  }

  /**
   * Cancels orders through the engine and places a new one
   * @param params
   */
  async cancelAndPlace(params: CancelAndPlaceOrderParams) {
    const { productId, order, nonce, spotLeverage } = params.placeOrder;
    const subaccountOwner = await this.getSubaccountOwnerIfNeeded(
      params.cancelOrders,
    );
    const chainId = await this.getSignerChainIdIfNeeded(params.cancelOrders);

    return this.context.engineClient.cancelAndPlace({
      cancelOrders: {
        ...params.cancelOrders,
        subaccountOwner,
        verifyingAddr:
          params.cancelOrders.verifyingAddr ?? this.getEndpointAddress(),
        chainId,
      },
      placeOrder: {
        order: {
          ...order,
          subaccountOwner,
        },
        verifyingAddr: await this.getOrderbookVerifyingAddressIfNeeded(
          params.placeOrder,
        ),
        chainId,
        productId,
        spotLeverage,
        nonce,
      },
    });
  }

  /**
   * Cancels all orders for provided products through the engine.
   * @param params
   */
  async cancelProductOrders(params: CancelProductOrdersParams) {
    return this.context.engineClient.cancelProductOrders({
      ...params,
      chainId: await this.getSignerChainIdIfNeeded(params),
      subaccountOwner: await this.getSubaccountOwnerIfNeeded(params),
      verifyingAddr: this.getEndpointAddress(),
    });
  }

  /**
   * Places a trigger order through the trigger service
   * @param params
   */
  async placeTriggerOrder(params: PlaceTriggerOrderParams) {
    return this.context.triggerClient.placeTriggerOrder({
      ...params,
      chainId: await this.getSignerChainIdIfNeeded(params),
      verifyingAddr: await this.getOrderbookVerifyingAddressIfNeeded(params),
      order: {
        subaccountOwner: await this.getSubaccountOwnerIfNeeded(params.order),
        ...params.order,
      },
    });
  }

  /**
   * Cancels all trigger orders for provided digests through the trigger service.
   * @param params
   */
  async cancelTriggerOrders(params: CancelTriggerOrdersParams) {
    return this.context.triggerClient.cancelTriggerOrders({
      ...params,
      chainId: await this.getSignerChainIdIfNeeded(params),
      subaccountOwner: await this.getSubaccountOwnerIfNeeded(params),
      verifyingAddr: params.verifyingAddr ?? this.getEndpointAddress(),
    });
  }

  /**
   * Cancels all trigger orders for provided products through the trigger service.
   * @param params
   */
  async cancelTriggerProductOrders(params: CancelTriggerProductOrdersParams) {
    return this.context.triggerClient.cancelProductOrders({
      ...params,
      chainId: await this.getSignerChainIdIfNeeded(params),
      subaccountOwner: await this.getSubaccountOwnerIfNeeded(params),
      verifyingAddr: params.verifyingAddr ?? this.getEndpointAddress(),
    });
  }

  protected async getOrderbookVerifyingAddressIfNeeded(
    params: OptionalSignatureParams<{
      productId: number;
    }>,
  ): Promise<string> {
    return (
      params.verifyingAddr ?? (await this.getOrderbookAddress(params.productId))
    );
  }
}
