import {
  BurnLpParams,
  getVertexEIP712Values,
  LiquidateSubaccountParams,
  OrderCancellationParams,
} from '@vertex-protocol/contracts';
import {
  EngineExecuteRequestParamsByType,
  EngineMintLpParams,
  EngineServerExecuteRequestByType,
  WithoutNonce,
} from './types';
import { EngineBaseClient } from './EngineBaseClient';
import { hexlify } from 'ethers/lib/utils';

type WithEndpointAddr<T> = T & {
  endpointAddr: string;
};

export class EngineExecuteClient extends EngineBaseClient {
  async liquidateSubaccount(
    params: WithoutNonce<WithEndpointAddr<LiquidateSubaccountParams>>,
  ) {
    const { txNonce } = await this.getNoncesForCurrentSigner();
    const paramsWithNonce = { ...params, nonce: txNonce };

    const tx = getVertexEIP712Values('liquidate_subaccount', paramsWithNonce);
    const signature = await this.sign(
      'liquidate_subaccount',
      params.endpointAddr,
      paramsWithNonce,
    );

    return this.execute('liquidate_subaccount', {
      signature,
      tx: {
        ...tx,
        liquidatee: hexlify(tx.liquidatee),
        sender: hexlify(tx.sender),
      },
    });
  }

  async withdrawCollateral(
    params: EngineExecuteRequestParamsByType['withdraw_collateral'],
  ) {
    return this.execute(
      'withdraw_collateral',
      await this.getServerWithdrawCollateralParams(params),
    );
  }

  async getServerWithdrawCollateralParams(
    params: EngineExecuteRequestParamsByType['withdraw_collateral'],
  ): Promise<EngineServerExecuteRequestByType['withdraw_collateral']> {
    const nonce = await (async () => {
      if (params.nonce) {
        return params.nonce;
      }
      const { txNonce } = await this.getNoncesForCurrentSigner();
      return txNonce;
    })();

    const paramsWithNonce = { ...params, nonce };
    const signature = await (async () => {
      if ('signature' in params) {
        return params.signature;
      }
      return await this.sign(
        'withdraw_collateral',
        params.verifyingAddr,
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
      spot_leverage: params.spotLeverage ?? null,
    };
  }

  async mintLp(params: WithoutNonce<WithEndpointAddr<EngineMintLpParams>>) {
    const { txNonce } = await this.getNoncesForCurrentSigner();
    const paramsWithNonce = { ...params, nonce: txNonce };

    const tx = getVertexEIP712Values('mint_lp', paramsWithNonce);
    const signature = await this.sign(
      'mint_lp',
      params.endpointAddr,
      paramsWithNonce,
    );

    return this.execute('mint_lp', {
      signature,
      tx: {
        ...tx,
        sender: hexlify(tx.sender),
      },
      spot_leverage: params.spotLeverage ?? null,
    });
  }

  async burnLp(params: WithoutNonce<WithEndpointAddr<BurnLpParams>>) {
    const { txNonce } = await this.getNoncesForCurrentSigner();
    const paramsWithNonce = { ...params, nonce: txNonce };

    const tx = getVertexEIP712Values('burn_lp', paramsWithNonce);
    const signature = await this.sign(
      'burn_lp',
      params.endpointAddr,
      paramsWithNonce,
    );

    return this.execute('burn_lp', {
      signature,
      tx: {
        ...tx,
        sender: hexlify(tx.sender),
      },
    });
  }

  async placeOrder(params: EngineExecuteRequestParamsByType['place_order']) {
    return this.execute(
      'place_order',
      await this.getServerPlaceOrderParams(params),
    );
  }

  async getServerPlaceOrderParams(
    params: EngineExecuteRequestParamsByType['place_order'],
  ): Promise<EngineServerExecuteRequestByType['place_order']> {
    const nonce = await (async () => {
      if (params.nonce) {
        return params.nonce;
      }
      const { orderNonce } = await this.getNoncesForCurrentSigner();
      return orderNonce;
    })();

    const orderWithNonce = {
      ...params.order,
      nonce,
    };

    const order = getVertexEIP712Values('place_order', orderWithNonce);
    const signature = await (async () => {
      if ('signature' in params) {
        return params.signature;
      }
      return await this.sign(
        'place_order',
        params.verifyingAddr,
        orderWithNonce,
      );
    })();

    return {
      product_id: params.productId,
      order: {
        ...order,
        sender: hexlify(order.sender),
      },
      signature,
      spot_leverage: params.spotLeverage ?? null,
    };
  }

  async cancelOrder(
    params: WithoutNonce<WithEndpointAddr<OrderCancellationParams>>,
  ) {
    const { orderNonce } = await this.getNoncesForCurrentSigner();
    const paramsWithNonce = { ...params, nonce: orderNonce };

    const tx = getVertexEIP712Values('cancel_orders', paramsWithNonce);
    const signature = await this.sign(
      'cancel_orders',
      params.endpointAddr,
      paramsWithNonce,
    );

    return this.execute('cancel_orders', {
      tx: {
        ...tx,
        sender: hexlify(tx.sender),
      },
      signature,
    });
  }
}
