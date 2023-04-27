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

    console.log('EngineExecuteClient: orderWithNonce', orderWithNonce);

    const signature = await (async () => {
      if ('signature' in params) {
        return params.signature;
      }

      const chainId = await this.getChainIdIfNeeded(params);

      const digest = getOrderDigest({
        chainId,
        order: orderWithNonce,
        verifyingAddr: params.verifyingAddr,
      });
      console.log('EngineExecuteClient: computed digest', digest);

      return await this.sign(
        'place_order',
        params.verifyingAddr,
        chainId,
        orderWithNonce,
      );
    })();

    const placeOrderPayload = this.payloadBuilder.buildPlaceOrderPayload({
      ...params,
      nonce,
      order: orderWithNonce,
      signature,
    });

    console.log('EngineExecuteClient: placeOrderPayload', placeOrderPayload);

    const executeResult = await this.execute(
      'place_order',
      placeOrderPayload.payload,
    );

    return {
      ...executeResult,
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

      const chainId = await this.getChainIdIfNeeded(params);
      return await this.sign(
        'cancel_orders',
        params.verifyingAddr,
        chainId,
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
