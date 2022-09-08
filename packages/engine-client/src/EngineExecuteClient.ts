import {
  DepositCollateralParams,
  encodeSignedCollateralTx,
  encodeSignedLiquidateSubaccountTx,
  encodeSignedOrderTx,
  getOrderDigest,
  getSignedTransactionRequest,
  LiquidateSubaccountParams,
  SignableRequestType,
  SignableRequestTypeToParams,
  WithdrawCollateralParams,
} from '@vertex-protocol/contracts';
import {
  CancelOrderParams,
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

  async placeOrder(params: PlaceOrderParams): Promise<string> {
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
    await this.execute('place_order', {
      digest,
      product_id: params.productId,
      signed_order: encodeSignedOrderTx(signedOrder),
    });

    return digest;
  }

  async cancelOrder(params: CancelOrderParams): Promise<string> {
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
    await this.execute('cancel_order', {
      digest,
      product_id: params.productId,
      signed_order: encodeSignedOrderTx(signedOrder),
    });

    return digest;
  }

  // TODO: settle PNL

  private async getSigningChainId(): Promise<number> {
    return this.opts.signingChainId ?? (await this.opts.signer.getChainId());
  }

  private async sign<T extends SignableRequestType>(
    requestType: T,
    verifyingContract: string,
    params: SignableRequestTypeToParams[T],
  ) {
    return getSignedTransactionRequest({
      chainId: await this.getSigningChainId(),
      requestParams: params,
      requestType,
      signer: this.opts.signer,
      verifyingContract,
    });
  }
}
