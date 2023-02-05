import {
  BurnLpParams,
  getOrderDigest,
  getVertexEIP712Values,
  LiquidateSubaccountParams,
  OrderCancellationParams,
  WithdrawCollateralParams,
} from '@vertex-protocol/contracts';
import {
  EngineMintLpParams,
  EngineWithdrawCollateralParams,
  OrderActionResult,
  PlaceOrderParamsWithoutNonce,
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
    params: WithoutNonce<WithEndpointAddr<EngineWithdrawCollateralParams>>,
  ) {
    const { txNonce } = await this.getNoncesForCurrentSigner();
    const paramsWithNonce = { ...params, nonce: txNonce };

    const tx = getVertexEIP712Values(
      'withdraw_collateral',
      paramsWithNonce,
    ) as unknown as WithdrawCollateralParams;
    tx.sender = hexlify(tx.sender);
    const signature = await this.sign(
      'withdraw_collateral',
      params.endpointAddr,
      paramsWithNonce,
    );

    return this.execute('withdraw_collateral', {
      signature,
      tx: {
        ...tx,
        sender: hexlify(tx.sender),
      },
      spot_leverage: params.spotLeverage ?? null,
    });
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

  async placeOrder(
    params: PlaceOrderParamsWithoutNonce,
  ): Promise<OrderActionResult> {
    const { orderNonce } = await this.getNoncesForCurrentSigner();
    const orderWithNonce = {
      ...params.order,
      nonce: orderNonce,
    };

    const digest = await getOrderDigest({
      chainId: await this.getSigningChainId(),
      order: orderWithNonce,
      orderbookAddress: params.orderbookAddr,
    });
    const order = getVertexEIP712Values('place_order', orderWithNonce);

    const executeResult = await this.execute('place_order', {
      product_id: params.productId,
      order: {
        ...order,
        sender: hexlify(order.sender),
      },
      signature: await this.sign(
        'place_order',
        params.orderbookAddr,
        orderWithNonce,
      ),
      spot_leverage: params.spotLeverage ?? null,
    });

    return { digest, ...executeResult };
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

  // TODO: settle PNL
}
