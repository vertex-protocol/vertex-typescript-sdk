import {
  getOrderNonce,
  getVertexEIP712Values,
  OrderParams,
  SignableRequestType,
  SignableRequestTypeToParams,
} from '@vertex-protocol/contracts';
import { EngineBaseClient } from './EngineBaseClient';
import {
  EngineExecuteRequestParamsByType,
  EngineServerExecutePlaceOrderPayload,
  EngineServerExecuteRequestByType,
  SignatureParams,
  WithBaseEngineExecuteParams,
  WithSignature,
} from './types';
import { hexlify } from 'ethers';

/**
 * @description Builds execute payloads as expected by the server.
 * @param nonce A nonce is computed when one is not provided.
 * @param signature A signature is computed when one is not provided.
 */
export class EngineExecuteBuilder {
  readonly engineClient: EngineBaseClient;

  constructor(engineClient: EngineBaseClient) {
    this.engineClient = engineClient;
  }

  /**
   * Builds server payload for the `liquidate_subaccount` execute action.
   * @param clientParams Client LiquidateSubaccount params.
   * @returns `liquidate_subaccount` payload
   */
  async buildLiquidateSubaccountPayload(
    clientParams: EngineExecuteRequestParamsByType['liquidate_subaccount'],
  ): Promise<EngineServerExecuteRequestByType['liquidate_subaccount']> {
    const nonce = await this.getTxNonceIfNeeded(clientParams);
    const paramsWithNonce = { ...clientParams, nonce };

    const tx = getVertexEIP712Values('liquidate_subaccount', paramsWithNonce);
    const signature = await this.getSignatureIfNeeded(
      'liquidate_subaccount',
      paramsWithNonce,
    );

    return {
      signature,
      tx: {
        ...tx,
        liquidatee: hexlify(tx.liquidatee),
        sender: hexlify(tx.sender),
      },
    };
  }

  /**
   * Builds server payload for the `withdraw_collateral` execute action.
   * @param clientParams Client WithdrawCollateral params.
   * @returns `liquidate_subaccount` payload
   */
  async buildWithdrawCollateralPayload(
    clientParams: EngineExecuteRequestParamsByType['withdraw_collateral'],
  ): Promise<EngineServerExecuteRequestByType['withdraw_collateral']> {
    const nonce = await this.getTxNonceIfNeeded(clientParams);
    const paramsWithNonce = { ...clientParams, nonce };

    const signature = await this.getSignatureIfNeeded(
      'withdraw_collateral',
      paramsWithNonce,
    );

    const tx = getVertexEIP712Values('withdraw_collateral', paramsWithNonce);
    return {
      signature,
      tx,
      spot_leverage: clientParams.spotLeverage ?? null,
    };
  }

  /**
   * Builds server payload for the `mint_lp` execute action.
   * @param clientParams Client MintLp params.
   * @returns `mint_lp` payload
   */
  async buildMintLpPayload(
    clientParams: EngineExecuteRequestParamsByType['mint_lp'],
  ): Promise<EngineServerExecuteRequestByType['mint_lp']> {
    const nonce = await this.getTxNonceIfNeeded(clientParams);
    const paramsWithNonce = { ...clientParams, nonce };

    const tx = getVertexEIP712Values('mint_lp', paramsWithNonce);
    const signature = await this.getSignatureIfNeeded(
      'mint_lp',
      paramsWithNonce,
    );

    return {
      signature,
      tx,
      spot_leverage: clientParams.spotLeverage ?? null,
    };
  }

  /**
   * Builds server payload for the `burn_lp` execute action.
   * @param clientParams Client BurnLp params.
   * @returns `burn_lp` payload
   */
  async buildBurnLpPayload(
    clientParams: EngineExecuteRequestParamsByType['burn_lp'],
  ): Promise<EngineServerExecuteRequestByType['burn_lp']> {
    const nonce = await this.getTxNonceIfNeeded(clientParams);
    const paramsWithNonce = { ...clientParams, nonce };

    const tx = getVertexEIP712Values('burn_lp', paramsWithNonce);
    const signature = await this.getSignatureIfNeeded(
      'burn_lp',
      paramsWithNonce,
    );

    return {
      signature,
      tx,
    };
  }

  /**
   * Builds server payload for the `place_order` execute action.
   *
   * @param clientParams Client PlaceOrder params.
   * @returns `place_order` payload
   */
  async buildPlaceOrderPayload(
    clientParams: EngineExecuteRequestParamsByType['place_order'],
  ): Promise<EngineServerExecutePlaceOrderPayload> {
    const nonce = this.getOrderNonceIfNeeded(clientParams);
    const orderWithNonce = { ...clientParams.order, nonce };

    const signature = await this.getSignatureIfNeeded('place_order', {
      // Gets expected type
      ...clientParams,
      ...orderWithNonce,
    });

    return this.buildPlaceOrderPayloadSync({
      ...clientParams,
      order: orderWithNonce,
      signature,
    });
  }

  /**
   * Synchronously builds server payload for the `place_order` execute action.
   *
   * @param clientParams Client PlaceOrder params.
   * @returns `place_order` payload
   */
  buildPlaceOrderPayloadSync(
    clientParams: WithSignature<
      EngineExecuteRequestParamsByType['place_order'] & {
        order: OrderParams;
      }
    >,
  ): EngineServerExecutePlaceOrderPayload {
    const orderEIP712Values = getVertexEIP712Values(
      'place_order',
      clientParams.order,
    );

    return {
      payload: {
        id: clientParams.id ?? null,
        product_id: clientParams.productId,
        order: {
          ...orderEIP712Values,
          sender: hexlify(orderEIP712Values.sender),
        },
        signature: clientParams.signature,
        spot_leverage: clientParams.spotLeverage ?? null,
      },
      orderParams: clientParams.order,
    };
  }

  /**
   * Builds server payload for the `cancel_orders` execute action. As such, requires a signature to be given
   *
   * @param clientParams Client CancelOrders params.
   * @returns `cancel_orders` payload
   */
  async buildCancelOrdersPayload(
    clientParams: EngineExecuteRequestParamsByType['cancel_orders'],
  ): Promise<EngineServerExecuteRequestByType['cancel_orders']> {
    const nonce = this.getOrderNonceIfNeeded(clientParams);
    const paramsWithNonce = { ...clientParams, nonce };
    const signature = await this.getSignatureIfNeeded(
      'cancel_orders',
      paramsWithNonce,
    );

    return this.buildCancelOrdersPayloadSync({
      ...paramsWithNonce,
      signature,
    });
  }

  /**
   * Synchronously builds server payload for the `cancel_orders` execute action.
   *
   * @param clientParams Client CancelOrders params.
   * @returns `cancel_orders` payload
   */
  buildCancelOrdersPayloadSync(
    clientParams: WithSignature<
      EngineExecuteRequestParamsByType['cancel_orders'] & { nonce: string }
    >,
  ): EngineServerExecuteRequestByType['cancel_orders'] {
    const tx = getVertexEIP712Values('cancel_orders', clientParams);

    return {
      tx,
      signature: clientParams.signature,
    };
  }

  /**
   * Builds server payload for the `cancel_product_orders` execute action.
   * @param clientParams Client CancelProductOrders params.
   * @returns `cancel_product_orders` payload
   */
  async buildCancelProductOrdersPayload(
    clientParams: EngineExecuteRequestParamsByType['cancel_product_orders'],
  ): Promise<EngineServerExecuteRequestByType['cancel_product_orders']> {
    const nonce = this.getOrderNonceIfNeeded(clientParams);
    const paramsWithNonce = { ...clientParams, nonce };

    const tx = getVertexEIP712Values('cancel_product_orders', paramsWithNonce);
    const signature = await this.getSignatureIfNeeded(
      'cancel_product_orders',
      paramsWithNonce,
    );

    return {
      tx,
      signature,
    };
  }

  /**
   * Builds server payload for the `link_signer` execute action.
   *
   * @param clientParams Client LinkSigner params.
   * @returns `link_signer` payload
   */
  async buildLinkSignerPayload(
    clientParams: EngineExecuteRequestParamsByType['link_signer'],
  ): Promise<EngineServerExecuteRequestByType['link_signer']> {
    const nonce = await this.getTxNonceIfNeeded(clientParams);
    const paramsWithNonce = { ...clientParams, nonce };

    const tx = getVertexEIP712Values('link_signer', paramsWithNonce);
    const signature = await this.getSignatureIfNeeded(
      'link_signer',
      paramsWithNonce,
    );

    return {
      tx,
      signature,
    };
  }

  protected async getSignatureIfNeeded<T extends SignableRequestType>(
    requestType: T,
    paramsWithNonce: SignatureParams & SignableRequestTypeToParams[T],
  ) {
    if ('signature' in paramsWithNonce) {
      return paramsWithNonce.signature;
    }

    return await this.engineClient.sign(
      requestType,
      paramsWithNonce.verifyingAddr,
      paramsWithNonce.chainId,
      paramsWithNonce,
    );
  }

  protected async getTxNonceIfNeeded(
    params: WithBaseEngineExecuteParams<unknown>,
  ) {
    if (params.nonce) {
      return params.nonce;
    }
    return await this.engineClient.getTxNonce();
  }

  protected getOrderNonceIfNeeded(
    params: WithBaseEngineExecuteParams<unknown>,
  ) {
    if (params.nonce) {
      return params.nonce;
    }
    return getOrderNonce();
  }
}
