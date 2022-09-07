import { EngineServerBaseClient } from './EngineServerBaseClient';
import {
  DepositCollateralParams,
  encodeSignedCollateralTx,
  encodeSignedLiquidateSubaccountTx,
  encodeSignedOrderTx,
  getOrderDigest,
  LiquidateSubaccountParams,
  SignedTx,
  WithdrawCollateralParams,
} from '@vertex-protocol/contracts';
import { CancelOrderParams, PlaceOrderParams } from './types';

export class EngineServerExecuteClient extends EngineServerBaseClient {
  async liquidateSubaccount(signedTx: SignedTx<LiquidateSubaccountParams>) {
    return this.execute(
      'liquidate_subaccount',
      encodeSignedLiquidateSubaccountTx(signedTx),
    );
  }

  async depositCollateral(signedTx: SignedTx<DepositCollateralParams>) {
    return this.execute(
      'deposit_collateral',
      encodeSignedCollateralTx(signedTx),
    );
  }

  async withdrawCollateral(signedTx: SignedTx<WithdrawCollateralParams>) {
    return this.execute(
      'withdraw_collateral',
      encodeSignedCollateralTx(signedTx),
    );
  }

  async placeOrder(params: PlaceOrderParams): Promise<string> {
    const digest = await getOrderDigest({
      chainId: params.chainId,
      order: params.signedOrder.order,
      orderbookAddress: params.orderbookAddress,
    });
    await this.execute('place_order', {
      digest,
      product_id: params.productId,
      signed_order: encodeSignedOrderTx(params.signedOrder),
    });

    return digest;
  }

  async cancelOrder(params: CancelOrderParams): Promise<string> {
    const digest = await getOrderDigest({
      chainId: params.chainId,
      order: params.signedOrder.order,
      orderbookAddress: params.orderbookAddress,
    });
    await this.execute('cancel_order', {
      digest,
      product_id: params.productId,
      signed_order: encodeSignedOrderTx(params.signedOrder),
    });

    return digest;
  }

  // TODO: settle PNL
}
