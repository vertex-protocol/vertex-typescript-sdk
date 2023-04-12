import {
  EngineExecutePlaceOrderResult,
  EngineExecuteRequestParamsByType,
} from './types';
import { EngineExecuteBuilder } from './EngineExecuteBuilder';
import { EngineBaseClient, EngineClientOpts } from './EngineBaseClient';
import { getOrderDigest, OrderParams } from '@vertex-protocol/contracts';
import { getOrderNonce } from './utils';

export class EngineExecuteClient extends EngineBaseClient {
  readonly payloadBuilder: EngineExecuteBuilder;

  constructor(opts: EngineClientOpts) {
    super(opts);
    this.payloadBuilder = new EngineExecuteBuilder(this);
  }

  async liquidateSubaccount(
    params: EngineExecuteRequestParamsByType['liquidate_subaccount'],
  ) {
    return this.execute(
      'liquidate_subaccount',
      await this.payloadBuilder.buildLiquidateSubaccountPayload(params),
    );
  }

  async withdrawCollateral(
    params: EngineExecuteRequestParamsByType['withdraw_collateral'],
  ) {
    return this.execute(
      'withdraw_collateral',
      await this.payloadBuilder.buildWithdrawCollateralPayload(params),
    );
  }

  async mintLp(params: EngineExecuteRequestParamsByType['mint_lp']) {
    return this.execute(
      'mint_lp',
      await this.payloadBuilder.buildMintLpPayload(params),
    );
  }

  async burnLp(params: EngineExecuteRequestParamsByType['burn_lp']) {
    return this.execute(
      'burn_lp',
      await this.payloadBuilder.buildBurnLpPayload(params),
    );
  }

  async placeOrder(
    params: EngineExecuteRequestParamsByType['place_order'],
  ): Promise<EngineExecutePlaceOrderResult> {
    const nonce = (() => {
      if (params.nonce) {
        return params.nonce;
      }
      return getOrderNonce();
    })();
    const orderWithNonce = { ...params.order, nonce };

    const signature = await (async () => {
      if ('signature' in params) {
        return params.signature;
      }
      return await this.sign(
        'place_order',
        params.verifyingAddr,
        params.chainId,
        orderWithNonce,
      );
    })();

    const placeOrderPayload = this.payloadBuilder.buildPlaceOrderPayload({
      ...{
        ...params,
        order: orderWithNonce,
      },
      signature,
    });
    return {
      ...(await this.execute('place_order', placeOrderPayload.payload)),
      orderParams: placeOrderPayload.orderParams,
    };
  }

  async cancelOrders(
    params: EngineExecuteRequestParamsByType['cancel_orders'],
  ) {
    const nonce = (() => {
      if (params.nonce) {
        return params.nonce;
      }
      return getOrderNonce();
    })();
    const paramsWithNonce = { ...params, nonce };
    const signature = await (async () => {
      if ('signature' in params) {
        return params.signature;
      }
      return await this.sign(
        'cancel_orders',
        params.verifyingAddr,
        params.chainId,
        paramsWithNonce,
      );
    })();

    return this.execute(
      'cancel_orders',
      this.payloadBuilder.buildCancelOrdersPayload({
        ...paramsWithNonce,
        signature,
      }),
    );
  }

  async cancelProductOrders(
    params: EngineExecuteRequestParamsByType['cancel_product_orders'],
  ) {
    return this.execute(
      'cancel_product_orders',
      await this.payloadBuilder.buildCancelProductOrdersPayload(params),
    );
  }

  getOrderDigest(
    order: OrderParams,
    verifyingAddr: string,
    chainId: number,
  ): string {
    return getOrderDigest({
      chainId,
      order,
      verifyingAddr,
    });
  }
  // TODO: settle PNL
}
