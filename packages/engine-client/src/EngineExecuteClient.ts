import {
  DepositCollateralParams,
  encodeSignedCollateralTx,
  encodeSignedLiquidateSubaccountTx,
  encodeSignedOrder,
  getOrderDigest,
  LiquidateSubaccountParams,
  WithdrawCollateralParams,
} from '@vertex-protocol/contracts';
import {
  CancelOrderParams,
  OrderActionResult,
  PlaceOrderParams,
  WithSequencerAddr,
} from './types';
import { EngineBaseClient } from './EngineBaseClient';

export class EngineExecuteClient extends EngineBaseClient {
  async liquidateSubaccount(
    params: WithSequencerAddr<LiquidateSubaccountParams>,
  ) {
    const signature = await this.sign(
      'liquidate_subaccount',
      params.sequencerAddr,
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

  async depositCollateral(params: WithSequencerAddr<DepositCollateralParams>) {
    const signature = await this.sign(
      'deposit_collateral',
      params.sequencerAddr,
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

  async withdrawCollateral(
    params: WithSequencerAddr<WithdrawCollateralParams>,
  ) {
    const signature = await this.sign(
      'withdraw_collateral',
      params.sequencerAddr,
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

  async placeOrder(params: PlaceOrderParams): Promise<OrderActionResult> {
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
    const resultKey = await this.execute('place_order', {
      digest,
      product_id: params.productId,
      signed_order: encodeSignedOrder(signedOrder),
    });

    return { digest, executeResultKey: resultKey };
  }

  async cancelOrder(params: CancelOrderParams): Promise<OrderActionResult> {
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
    const resultKey = await this.execute('cancel_order', {
      digest,
      product_id: params.productId,
      signed_order: encodeSignedOrder(signedOrder),
    });

    return { digest, executeResultKey: resultKey };
  }

  // TODO: settle PNL
}
