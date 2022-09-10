import {
  DepositCollateralParams,
  encodeSignedCollateralTx,
  encodeSignedLiquidateSubaccountTx,
  encodeSignedOrder,
  getOrderDigest,
  LiquidateSubaccountParams,
  WithdrawCollateralParams,
} from '@vertex-protocol/contracts';
import { CancelOrderParams, PlaceOrderParams, WithEndpointAddr } from './types';
import { EngineBaseClient } from './EngineBaseClient';

export class EngineExecuteClient extends EngineBaseClient {
  async liquidateSubaccount(
    params: WithEndpointAddr<LiquidateSubaccountParams>,
  ) {
    const signature = await this.sign(
      'liquidate_subaccount',
      params.endpointAddr,
      params,
    );
    return this.execute(
      'liquidate_subaccount',
      encodeSignedLiquidateSubaccountTx({
        tx: params,
        signature,
      }),
    );
  }

  async depositCollateral(params: WithEndpointAddr<DepositCollateralParams>) {
    const signature = await this.sign(
      'deposit_collateral',
      params.endpointAddr,
      params,
    );
    return this.execute(
      'deposit_collateral',
      encodeSignedCollateralTx({
        tx: params,
        signature,
      }),
    );
  }

  async withdrawCollateral(params: WithEndpointAddr<WithdrawCollateralParams>) {
    const signature = await this.sign(
      'withdraw_collateral',
      params.endpointAddr,
      params,
    );
    return this.execute(
      'withdraw_collateral',
      encodeSignedCollateralTx({
        tx: params,
        signature,
      }),
    );
  }

  // TODO: type result
  async placeOrder(params: PlaceOrderParams) {
    const digest = await getOrderDigest({
      chainId: await this.getSigningChainId(),
      order: params.order,
      orderbookAddress: params.orderbookAddr,
    });
    const signedOrder = {
      order: params.order,
      signature: await this.sign(
        'place_order',
        params.orderbookAddr,
        params.order,
      ),
    };
    const executeResult = await this.execute('place_order', {
      digest,
      product_id: params.productId,
      signed_order: encodeSignedOrder(signedOrder),
    });

    return { digest, ...executeResult };
  }

  async cancelOrder(params: CancelOrderParams) {
    const digest = await getOrderDigest({
      chainId: await this.getSigningChainId(),
      order: params.order,
      orderbookAddress: params.orderbookAddr,
    });
    const signedOrder = {
      order: params.order,
      signature: await this.sign(
        'cancel_order',
        params.orderbookAddr,
        params.order,
      ),
    };
    const executeResult = await this.execute('cancel_order', {
      digest,
      product_id: params.productId,
      signed_order: encodeSignedOrder(signedOrder),
    });

    return { digest, ...executeResult };
  }

  // TODO: settle PNL
}
