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

  async placeOrder(params: PlaceOrderParams) {
    return this.execute('place_order', {
      digest: await getOrderDigest({
        chainId: params.chainId,
        order: params.signedOrder.order,
        orderbookAddress: params.orderbookAddress,
      }),
      product_id: params.productId,
      signed_order: encodeSignedOrderTx(params.signedOrder),
    });
  }

  async cancelOrder(params: CancelOrderParams) {
    return this.execute('cancel_order', {
      digest: await getOrderDigest({
        chainId: params.chainId,
        order: params.signedOrder.order,
        orderbookAddress: params.orderbookAddress,
      }),
      product_id: params.productId,
      signed_order: encodeSignedOrderTx(params.signedOrder),
    });
  }

  // TODO: update time/price & settle PNL
}
