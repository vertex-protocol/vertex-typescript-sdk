import {
  getOrderDigest,
  getVertexEIP712Values,
} from '@vertex-protocol/contracts';
import { hexlify } from 'ethers/lib/utils';
import { EngineBaseClient } from './EngineBaseClient';
import {
  EngineExecuteRequestParamsByType,
  EngineServerExecuteRequestByType,
} from './types';
import { getOrderNonce } from './utils';

/**
 * @description Builds execute payloads as expected by the server.
 * @param nonce A nonce is computed when one is not provided.
 * @param signature A signature is computed when one is not provided.
 */
export class EngineExecuteBuilder extends EngineBaseClient {
  /**
   * Builds server payload for the `liquidate_subaccount` execute action.
   * @param clientParams Client LiquidateSubaccount params.
   * @returns `liquidate_subaccount` payload
   */
  async buildLiquidateSubaccountServerPayload(
    clientParams: EngineExecuteRequestParamsByType['liquidate_subaccount'],
  ): Promise<EngineServerExecuteRequestByType['liquidate_subaccount']> {
    const nonce = await (async () => {
      if (clientParams.nonce) {
        return clientParams.nonce;
      }
      return await this.getTxNonce();
    })();
    const paramsWithNonce = { ...clientParams, nonce };

    const tx = getVertexEIP712Values('liquidate_subaccount', paramsWithNonce);
    const signature = await (async () => {
      if ('signature' in clientParams) {
        return clientParams.signature;
      }
      return await this.sign(
        'liquidate_subaccount',
        clientParams.verifyingAddr,
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
  async buildWithdrawCollateralServerPayload(
    clientParams: EngineExecuteRequestParamsByType['withdraw_collateral'],
  ): Promise<EngineServerExecuteRequestByType['withdraw_collateral']> {
    const nonce = await (async () => {
      if (clientParams.nonce) {
        return clientParams.nonce;
      }
      return await this.getTxNonce();
    })();
    const paramsWithNonce = { ...clientParams, nonce };

    const signature = await (async () => {
      if ('signature' in clientParams) {
        return clientParams.signature;
      }
      return await this.sign(
        'withdraw_collateral',
        clientParams.verifyingAddr,
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
  async buildMintLpServerPayload(
    clientParams: EngineExecuteRequestParamsByType['mint_lp'],
  ): Promise<EngineServerExecuteRequestByType['mint_lp']> {
    const nonce = await (async () => {
      if (clientParams.nonce) {
        return clientParams.nonce;
      }
      return await this.getTxNonce();
    })();
    const paramsWithNonce = { ...clientParams, nonce };

    const tx = getVertexEIP712Values('mint_lp', paramsWithNonce);
    const signature = await (async () => {
      if ('signature' in clientParams) {
        return clientParams.signature;
      }
      return await this.sign(
        'mint_lp',
        clientParams.verifyingAddr,
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
  async burnBurnLpServerPayload(
    clientParams: EngineExecuteRequestParamsByType['burn_lp'],
  ): Promise<EngineServerExecuteRequestByType['burn_lp']> {
    const nonce = await (async () => {
      if (clientParams.nonce) {
        return clientParams.nonce;
      }
      return await this.getTxNonce();
    })();
    const paramsWithNonce = { ...clientParams, nonce };

    const tx = getVertexEIP712Values('burn_lp', paramsWithNonce);
    const signature = await (async () => {
      if ('signature' in clientParams) {
        return clientParams.signature;
      }
      return await this.sign(
        'burn_lp',
        clientParams.verifyingAddr,
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
   * @param includeDigest Optionally compute `order` digest. Must be excluded from final payload send to the server.
   * @returns `place_order` payload
   */
  async buildPlaceOrderServerPayload(
    clientParams: EngineExecuteRequestParamsByType['place_order'],
    includeDigest = false,
  ): Promise<
    EngineServerExecuteRequestByType['place_order'] & { digest: string | null }
  > {
    const nonce = await (async () => {
      if (clientParams.order.nonce) {
        return clientParams.order.nonce;
      }
      return getOrderNonce();
    })();

    const orderWithNonce = {
      ...clientParams.order,
      nonce,
    };

    const order = getVertexEIP712Values('place_order', orderWithNonce);
    const { signature, digest } = await (async () => {
      if ('signature' in clientParams) {
        return { signature: clientParams.signature, digest: null };
      }
      const digest = includeDigest
        ? await getOrderDigest({
            chainId: await this.getSigningChainId(),
            order: orderWithNonce,
            orderbookAddress: clientParams.verifyingAddr,
          })
        : null;
      const signature = await this.sign(
        'place_order',
        clientParams.verifyingAddr,
        orderWithNonce,
      );
      return {
        signature,
        digest,
      };
    })();

    return {
      product_id: clientParams.productId,
      order: {
        ...order,
        sender: hexlify(order.sender),
      },
      signature,
      spot_leverage: clientParams.spotLeverage ?? null,
      digest,
    };
  }

  async buildCancelOrdersServerPayload(
    clientParams: EngineExecuteRequestParamsByType['cancel_orders'],
  ): Promise<EngineServerExecuteRequestByType['cancel_orders']> {
    const nonce = await (async () => {
      if (clientParams.nonce) {
        return clientParams.nonce;
      }
      return getOrderNonce();
    })();
    const paramsWithNonce = { ...clientParams, nonce };

    const tx = getVertexEIP712Values('cancel_orders', paramsWithNonce);
    const signature = await (async () => {
      if ('signature' in clientParams) {
        return clientParams.signature;
      }
      return await this.sign(
        'cancel_orders',
        clientParams.verifyingAddr,
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
