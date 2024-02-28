import { BaseVertexAPI } from '../base';
import { OptionalSignatureParams } from '../types';
import {
  ExecuteBurnLpParams,
  ExecuteCancelAndPlaceOrderParams,
  ExecuteCancelOrdersParams,
  ExecuteCancelProductOrdersParams,
  ExecuteCancelTriggerOrdersParams,
  ExecuteCancelTriggerProductOrdersParams,
  ExecuteMintLpParams,
  ExecutePlaceOrderParams,
  ExecutePlaceTriggerOrderParams,
} from './types';

export class MarketExecuteAPI extends BaseVertexAPI {
  /**
   * Mint LP tokens through engine
   * @param params
   */
  async mintLp(params: ExecuteMintLpParams) {
    return this.context.engineClient.mintLp({
      ...params,
      chainId: await this.getSignerChainIdIfNeeded(params),
      verifyingAddr: params.verifyingAddr ?? this.getEndpointAddress(),
      subaccountOwner: await this.getSubaccountOwnerIfNeeded(params),
    });
  }

  /**
   * Burn LP tokens through engine
   * @param params
   */
  async burnLp(params: ExecuteBurnLpParams) {
    return this.context.engineClient.burnLp({
      ...params,
      chainId: await this.getSignerChainIdIfNeeded(params),
      verifyingAddr: params.verifyingAddr ?? this.getEndpointAddress(),
      subaccountOwner: await this.getSubaccountOwnerIfNeeded(params),
    });
  }

  /**
   * Places an order through the engine
   * @param params
   */
  async placeOrder(params: ExecutePlaceOrderParams) {
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
  async cancelOrders(params: ExecuteCancelOrdersParams) {
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
  async cancelAndPlace(params: ExecuteCancelAndPlaceOrderParams) {
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
  async cancelProductOrders(params: ExecuteCancelProductOrdersParams) {
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
  async placeTriggerOrder(params: ExecutePlaceTriggerOrderParams) {
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
  async cancelTriggerOrders(params: ExecuteCancelTriggerOrdersParams) {
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
  async cancelTriggerProductOrders(
    params: ExecuteCancelTriggerProductOrdersParams,
  ) {
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
