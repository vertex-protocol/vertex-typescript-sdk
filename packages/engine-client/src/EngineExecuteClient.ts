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
  EngineServerOrderParams,
  OrderActionResult,
  PlaceOrderParamsWithoutNonce,
  WithoutNonce,
} from './types';
import { EngineBaseClient } from './EngineBaseClient';

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

    const tx = getVertexEIP712Values(
      'liquidate_subaccount',
      paramsWithNonce,
    ) as unknown as LiquidateSubaccountParams;
    const signature = await this.sign(
      'liquidate_subaccount',
      params.endpointAddr,
      tx,
    );

    return this.execute('liquidate_subaccount', {
      signature,
      tx,
    });
  }

  async withdrawCollateral(
    params: WithoutNonce<WithEndpointAddr<WithdrawCollateralParams>>,
  ) {
    const { txNonce } = await this.getNoncesForCurrentSigner();
    const paramsWithNonce = { ...params, nonce: txNonce };

    const tx = getVertexEIP712Values(
      'withdraw_collateral',
      paramsWithNonce,
    ) as unknown as WithdrawCollateralParams;
    const signature = await this.sign(
      'withdraw_collateral',
      params.endpointAddr,
      tx,
    );

    return this.execute('withdraw_collateral', {
      signature,
      tx: getVertexEIP712Values(
        'withdraw_collateral',
        tx,
      ) as unknown as WithdrawCollateralParams,
    });
  }

  async mintLp(params: WithoutNonce<WithEndpointAddr<MintLpParams>>) {
    const { txNonce } = await this.getNoncesForCurrentSigner();
    const paramsWithNonce = { ...params, nonce: txNonce };

    const tx = getVertexEIP712Values(
      'mint_lp',
      paramsWithNonce,
    ) as unknown as MintLpParams;
    const signature = await this.sign('mint_lp', params.endpointAddr, tx);

    return this.execute('mint_lp', {
      signature,
      tx,
    });
  }

  async burnLp(params: WithoutNonce<WithEndpointAddr<BurnLpParams>>) {
    const { txNonce } = await this.getNoncesForCurrentSigner();
    const paramsWithNonce = { ...params, nonce: txNonce };

    const tx = getVertexEIP712Values(
      'burn_lp',
      paramsWithNonce,
    ) as unknown as WithdrawCollateralParams;
    const signature = await this.sign('burn_lp', params.endpointAddr, tx);
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

    const executeResult = await this.execute('place_order', {
      product_id: params.productId,
      order: getVertexEIP712Values(
        'place_order',
        orderWithNonce,
      ) as EngineServerOrderParams,
      signature: await this.sign(
        'place_order',
        params.orderbookAddr,
        orderWithNonce,
      ),
    });

    return { digest, ...executeResult };
  }

  async cancelOrder(
    params: WithoutNonce<WithEndpointAddr<OrderCancellationParams>>,
  ) {
    const { orderNonce } = await this.getNoncesForCurrentSigner();
    const paramsWithNonce = { ...params, nonce: orderNonce };

    const tx = getVertexEIP712Values(
      'cancel_order',
      paramsWithNonce,
    ) as unknown as OrderCancellationParams;
    const signature = await this.sign('cancel_order', params.endpointAddr, tx);

    return this.execute('cancel_order', {
      tx,
      signature,
    });
  }

  // TODO: settle PNL
}
