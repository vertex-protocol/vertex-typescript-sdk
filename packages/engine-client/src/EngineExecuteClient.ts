import { EngineExecuteRequestParamsByType } from './types';
import { EngineExecuteBuilder } from './EngineExecuteBuilder';
import { EngineBaseClient, EngineClientOpts } from './EngineBaseClient';
import { getOrderDigest, OrderParams } from '@vertex-protocol/contracts';

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

  async placeOrder(params: EngineExecuteRequestParamsByType['place_order']) {
    return this.execute(
      'place_order',
      await (
        await this.payloadBuilder.buildPlaceOrderPayload(params)
      ).payload,
    );
  }

  async cancelOrders(
    params: EngineExecuteRequestParamsByType['cancel_orders'],
  ) {
    return this.execute(
      'cancel_orders',
      await this.payloadBuilder.buildCancelOrdersPayload(params),
    );
  }

  async getOrderDigest(
    order: OrderParams,
    verifyingAddr: string,
  ): Promise<string> {
    return await getOrderDigest({
      chainId: await this.getSigningChainId(),
      order,
      verifyingAddr,
    });
  }

  // TODO: settle PNL
}
