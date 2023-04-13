import { getVertexEIP712Values } from '@vertex-protocol/contracts';
import { hexlify } from 'ethers/lib/utils';
import { EngineBaseClient } from './EngineBaseClient';
import {
  EngineExecuteRequestParamsByType,
  EngineServerExecutePlaceOrderPayload,
  EngineServerExecuteRequestByType,
  WithSignature,
} from './types';
import { getOrderNonce } from './utils';

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
    const nonce = await (async () => {
      if (clientParams.nonce) {
        return clientParams.nonce;
      }
      return await this.engineClient.getTxNonce();
    })();
    const paramsWithNonce = { ...clientParams, nonce };

    const tx = getVertexEIP712Values('liquidate_subaccount', paramsWithNonce);
    const signature = await (async () => {
      if ('signature' in clientParams) {
        return clientParams.signature;
      }

      const chainId = await this.engineClient.getChainIdIfNeeded(clientParams);

      return await this.engineClient.sign(
        'liquidate_subaccount',
        clientParams.verifyingAddr,
        chainId,
        paramsWithNonce,
      );
    })();

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
    const nonce = await (async () => {
      if (clientParams.nonce) {
        return clientParams.nonce;
      }
      return await this.engineClient.getTxNonce();
    })();
    const paramsWithNonce = { ...clientParams, nonce };

    const signature = await (async () => {
      if ('signature' in clientParams) {
        return clientParams.signature;
      }

      const chainId = await this.engineClient.getChainIdIfNeeded(clientParams);

      return await this.engineClient.sign(
        'withdraw_collateral',
        clientParams.verifyingAddr,
        chainId,
        paramsWithNonce,
      );
    })();

    const tx = getVertexEIP712Values('withdraw_collateral', paramsWithNonce);
    return {
      signature,
      tx: {
        ...tx,
        sender: hexlify(tx.sender),
      },
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
    const nonce = await (async () => {
      if (clientParams.nonce) {
        return clientParams.nonce;
      }
      return await this.engineClient.getTxNonce();
    })();
    const paramsWithNonce = { ...clientParams, nonce };

    const tx = getVertexEIP712Values('mint_lp', paramsWithNonce);
    const signature = await (async () => {
      if ('signature' in clientParams) {
        return clientParams.signature;
      }

      const chainId = await this.engineClient.getChainIdIfNeeded(clientParams);

      return await this.engineClient.sign(
        'mint_lp',
        clientParams.verifyingAddr,
        chainId,
        paramsWithNonce,
      );
    })();

    return {
      signature,
      tx: {
        ...tx,
        sender: hexlify(tx.sender),
      },
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
    const nonce = await (async () => {
      if (clientParams.nonce) {
        return clientParams.nonce;
      }
      return await this.engineClient.getTxNonce();
    })();
    const paramsWithNonce = { ...clientParams, nonce };

    const tx = getVertexEIP712Values('burn_lp', paramsWithNonce);
    const signature = await (async () => {
      if ('signature' in clientParams) {
        return clientParams.signature;
      }

      const chainId = await this.engineClient.getChainIdIfNeeded(clientParams);

      return await this.engineClient.sign(
        'burn_lp',
        clientParams.verifyingAddr,
        chainId,
        paramsWithNonce,
      );
    })();

    return {
      signature,
      tx: {
        ...tx,
        sender: hexlify(tx.sender),
      },
    };
  }

  /**
   * Builds server payload for the `place_order` execute action.
   * @param clientParams Client PlaceOrder params.
   * @returns `place_order` payload
   */
  buildPlaceOrderPayload(
    clientParams: WithSignature<
      EngineExecuteRequestParamsByType['place_order']
    >,
  ): EngineServerExecutePlaceOrderPayload {
    const nonce = (() => {
      if (clientParams.nonce) {
        return clientParams.nonce;
      }
      return getOrderNonce();
    })();

    const orderWithNonce = {
      ...clientParams.order,
      nonce,
    };

    const order = getVertexEIP712Values('place_order', orderWithNonce);

    return {
      payload: {
        product_id: clientParams.productId,
        order: {
          ...order,
          sender: hexlify(order.sender),
        },
        signature: clientParams.signature,
        spot_leverage: clientParams.spotLeverage ?? null,
      },
      orderParams: orderWithNonce,
    };
  }

  /**
   * Builds server payload for the `cancel_orders` execute action.
   * @param clientParams Client CancelOrders params.
   * @returns `cancel_orders` payload
   */
  buildCancelOrdersPayload(
    clientParams: WithSignature<
      EngineExecuteRequestParamsByType['cancel_orders']
    >,
  ): EngineServerExecuteRequestByType['cancel_orders'] {
    const nonce = (() => {
      if (clientParams.nonce) {
        return clientParams.nonce;
      }
      return getOrderNonce();
    })();
    const paramsWithNonce = { ...clientParams, nonce };

    const tx = getVertexEIP712Values('cancel_orders', paramsWithNonce);

    return {
      tx: {
        ...tx,
        sender: hexlify(tx.sender),
      },
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
    const nonce = await (async () => {
      if (clientParams.nonce) {
        return clientParams.nonce;
      }
      return getOrderNonce();
    })();
    const paramsWithNonce = { ...clientParams, nonce };

    const tx = getVertexEIP712Values('cancel_product_orders', paramsWithNonce);
    const signature = await (async () => {
      if ('signature' in clientParams) {
        return clientParams.signature;
      }

      const chainId = await this.engineClient.getChainIdIfNeeded(clientParams);

      return await this.engineClient.sign(
        'cancel_product_orders',
        clientParams.verifyingAddr,
        chainId,
        paramsWithNonce,
      );
    })();

    return {
      tx: {
        ...tx,
        sender: hexlify(tx.sender),
      },
      signature,
    };
  }
}
