import {
  BurnLpParams,
  getOrderDigest,
  getVertexEIP712Values,
  LiquidateSubaccountParams,
  MintLpParams,
  OrderCancellationParams,
  WithdrawCollateralParams,
} from '@vertex-protocol/contracts';
import {
  EngineMintLpParams,
  EngineServerOrderParams,
  EngineWithdrawCollateralParams,
  OrderActionResult,
  PlaceOrderParamsWithoutNonce,
  WithoutNonce,
} from './types';
import { EngineBaseClient } from './EngineBaseClient';
import { Bytes, hexlify } from 'ethers/lib/utils';

type WithEndpointAddr<T> = T & {
  endpointAddr: string;
};

// TODO: Lots of typehacks here, should be resolved by adding typing to getVertexEIP712Values
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
      tx as unknown as LiquidateSubaccountParams,
    );
    tx.sender = hexlify(tx.sender as Bytes);
    tx.liquidatee = hexlify(tx.liquidatee as Bytes);
    return this.execute('liquidate_subaccount', {
      signature,
      tx: tx as unknown as LiquidateSubaccountParams,
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
      tx,
    );

    return this.execute('withdraw_collateral', {
      signature,
      tx,
      spot_leverage: params.spotLeverage ?? null,
    });
  }

  async mintLp(params: WithoutNonce<WithEndpointAddr<EngineMintLpParams>>) {
    const { txNonce } = await this.getNoncesForCurrentSigner();
    const paramsWithNonce = { ...params, nonce: txNonce };

    const tx = getVertexEIP712Values(
      'mint_lp',
      paramsWithNonce,
    ) as unknown as MintLpParams;
    const signature = await this.sign('mint_lp', params.endpointAddr, tx);

    tx.sender = hexlify(tx.sender);
    return this.execute('mint_lp', {
      signature,
      tx,
      spot_leverage: params.spotLeverage ?? null,
    });
  }

  async burnLp(params: WithoutNonce<WithEndpointAddr<BurnLpParams>>) {
    const { txNonce } = await this.getNoncesForCurrentSigner();
    const paramsWithNonce = { ...params, nonce: txNonce };

    const tx = getVertexEIP712Values(
      'burn_lp',
      paramsWithNonce,
    ) as unknown as WithdrawCollateralParams;
    const signature = await this.sign(
      'burn_lp',
      params.endpointAddr,
      paramsWithNonce,
    );

    tx.sender = hexlify(tx.sender);
    return this.execute('burn_lp', {
      signature,
      tx,
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
    const order = {
      ...(getVertexEIP712Values(
        'place_order',
        orderWithNonce,
      ) as EngineServerOrderParams),
      nonce: orderNonce,
    };
    order.sender = hexlify(order.sender);
    const executeResult = await this.execute('place_order', {
      product_id: params.productId,
      order,
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

    const tx = getVertexEIP712Values(
      'cancel_orders',
      paramsWithNonce,
    ) as unknown as OrderCancellationParams;
    const signature = await this.sign('cancel_orders', params.endpointAddr, tx);
    tx.sender = hexlify(tx.sender);
    return this.execute('cancel_orders', {
      tx,
      signature,
    });
  }

  // TODO: settle PNL
}
