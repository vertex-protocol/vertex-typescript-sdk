import {
  getOrderDigest,
  getVertexEIP712Values,
} from '@vertex-protocol/contracts';
import {
  BurnLpParamsWithOptionalSignature,
  EngineMintLpParamsWithOptionalSignature,
  EngineWithdrawCollateralParamsWithOptionalSignature,
  LiquidateSubaccountParamsWithOptionalSignature,
  OrderActionResult,
  OrderCancellationParamsWithOptionalSignature,
  PlaceOrderParamsWithOptionalTxFields,
} from './types';
import { EngineBaseClient } from './EngineBaseClient';
import { hexlify } from 'ethers/lib/utils';

type WithEndpointAddr<T> = T & {
  endpointAddr: string;
};

export class EngineExecuteClient extends EngineBaseClient {
  async liquidateSubaccount(
    params: WithEndpointAddr<LiquidateSubaccountParamsWithOptionalSignature>,
  ) {
    const nonce =
      params.nonce || (await this.getNoncesForCurrentSigner()).txNonce;
    const paramsWithNonce = { ...params, nonce };

    const tx = getVertexEIP712Values('liquidate_subaccount', paramsWithNonce);
    const signature =
      params.signature ||
      (await this.sign(
        'liquidate_subaccount',
        params.endpointAddr,
        paramsWithNonce,
      ));

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
    params: WithEndpointAddr<EngineWithdrawCollateralParamsWithOptionalSignature>,
  ) {
    const nonce =
      params.nonce || (await this.getNoncesForCurrentSigner()).txNonce;
    const paramsWithNonce = { ...params, nonce };

    const signature =
      params.signature ||
      (await this.sign(
        'withdraw_collateral',
        params.endpointAddr,
        paramsWithNonce,
      ));

    const tx = getVertexEIP712Values('withdraw_collateral', paramsWithNonce);
    return this.execute('withdraw_collateral', {
      signature,
      tx: {
        ...tx,
        sender: hexlify(tx.sender),
      },
      spot_leverage: params.spotLeverage ?? null,
    });
  }

  async mintLp(
    params: WithEndpointAddr<EngineMintLpParamsWithOptionalSignature>,
  ) {
    const nonce =
      params.nonce || (await this.getNoncesForCurrentSigner()).txNonce;
    const paramsWithNonce = { ...params, nonce };

    const tx = getVertexEIP712Values('mint_lp', paramsWithNonce);
    const signature =
      params.signature ||
      (await this.sign('mint_lp', params.endpointAddr, paramsWithNonce));

    return this.execute('mint_lp', {
      signature,
      tx: {
        ...tx,
        sender: hexlify(tx.sender),
      },
      spot_leverage: params.spotLeverage ?? null,
    });
  }

  async burnLp(params: WithEndpointAddr<BurnLpParamsWithOptionalSignature>) {
    const nonce =
      params.nonce || (await (await this.getNoncesForCurrentSigner()).txNonce);
    const paramsWithNonce = { ...params, nonce };

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
    params: PlaceOrderParamsWithOptionalTxFields,
  ): Promise<OrderActionResult> {
    const orderNonce = params.order.nonce || (await this.genOrderNonce());
    const orderWithNonce = {
      ...params.order,
      nonce: orderNonce,
    };

    const digest =
      params.digest ||
      (await getOrderDigest({
        chainId: await this.getSigningChainId(),
        order: orderWithNonce,
        orderbookAddress: params.orderbookAddr,
      }));

    const order = getVertexEIP712Values('place_order', orderWithNonce);
    const signature =
      params.signature ||
      (await this.sign('place_order', params.orderbookAddr, orderWithNonce));

    const executeResult = await this.execute('place_order', {
      product_id: params.productId,
      order: {
        ...order,
        sender: hexlify(order.sender),
      },
      signature,
      spot_leverage: params.spotLeverage ?? null,
    });

    return { digest, ...executeResult };
  }

  async cancelOrder(
    params: WithEndpointAddr<OrderCancellationParamsWithOptionalSignature>,
  ) {
    const orderNonce = params.nonce || (await this.genOrderNonce());
    const paramsWithNonce = { ...params, nonce: orderNonce };

    const tx = getVertexEIP712Values('cancel_orders', paramsWithNonce);
    const signature =
      params.signature ||
      (await this.sign('cancel_orders', params.endpointAddr, paramsWithNonce));

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
