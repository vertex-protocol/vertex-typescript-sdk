import { EngineExecuteRequestParamsByType, OrderActionResult } from './types';
import { EngineExecuteBuilder } from './EngineExecuteBuilder';

type WithEndpointAddr<T> = T & {
  endpointAddr: string;
};

export class EngineExecuteClient extends EngineExecuteBuilder {
  async liquidateSubaccount(
    params: EngineExecuteRequestParamsByType['liquidate_subaccount'],
  ) {
    return this.execute(
      'liquidate_subaccount',
      await this.buildLiquidateSubaccountServerPayload(params),
    );
  }

  async withdrawCollateral(
    params: EngineExecuteRequestParamsByType['withdraw_collateral'],
  ) {
    return this.execute(
      'withdraw_collateral',
      await this.buildWithdrawCollateralServerPayload(params),
    );
  }

  async mintLp(params: EngineExecuteRequestParamsByType['mint_lp']) {
    return this.execute('mint_lp', await this.buildMintLpServerPayload(params));
  }

  async burnLp(params: EngineExecuteRequestParamsByType['burn_lp']) {
    return this.execute('burn_lp', await this.burnBurnLpServerPayload(params));
  }

  async placeOrder(
    params: EngineExecuteRequestParamsByType['place_order'],
  ): Promise<OrderActionResult> {
    const { digest, ...serverParams } = await this.buildPlaceOrderServerPayload(
      params,
      true,
    );
    return {
      digest: digest as string,
      ...(await this.execute('place_order', serverParams)),
    };
  }

  async cancelOrders(
    params: EngineExecuteRequestParamsByType['cancel_orders'],
  ) {
    return this.execute(
      'cancel_orders',
      await this.buildCancelOrdersServerPayload(params),
    );
  }

  // TODO: settle PNL
}
