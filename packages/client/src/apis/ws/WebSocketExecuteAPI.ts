import {
  EngineExecuteBurnLpParams,
  EngineExecuteCancelOrdersParams,
  EngineExecuteLiquidateSubaccountParams,
  EngineExecuteMintLpParams,
  EngineExecutePlaceOrderParams,
  EngineExecuteRequestParamsByType,
  EngineExecuteWithdrawCollateralParams,
  EngineServerExecuteRequestByType,
  EngineServerExecuteRequestType,
} from '@vertex-protocol/engine-client';
import { BaseVertexAPI } from '../base';

export class WebSocketExecuteAPI extends BaseVertexAPI {
  public async buildExecuteMsg<
    TRequestType extends EngineServerExecuteRequestType,
  >(
    requestType: TRequestType,
    params: EngineExecuteRequestParamsByType[TRequestType],
  ): Promise<EngineServerExecuteRequestByType[TRequestType]> {
    switch (requestType) {
      case 'withdraw_collateral':
        return (await this.context.engineClient.buildWithdrawCollateralServerPayload(
          params as EngineExecuteWithdrawCollateralParams,
        )) as EngineServerExecuteRequestByType[TRequestType];
      case 'mint_lp':
        return (await this.context.engineClient.buildMintLpServerPayload(
          params as EngineExecuteMintLpParams,
        )) as EngineServerExecuteRequestByType[TRequestType];
      case 'burn_lp':
        return (await this.context.engineClient.buildBurnLpServerPayload(
          params as EngineExecuteBurnLpParams,
        )) as EngineServerExecuteRequestByType[TRequestType];
      case 'place_order':
        return (await this.context.engineClient.buildPlaceOrderServerPayload(
          params as EngineExecutePlaceOrderParams,
        )) as EngineServerExecuteRequestByType[TRequestType];
      case 'cancel_orders':
        return (await this.context.engineClient.buildCancelOrdersServerPayload(
          params as EngineExecuteCancelOrdersParams,
        )) as EngineServerExecuteRequestByType[TRequestType];
      case 'liquidate_subaccount':
        return (await this.context.engineClient.buildLiquidateSubaccountServerPayload(
          params as EngineExecuteLiquidateSubaccountParams,
        )) as EngineServerExecuteRequestByType[TRequestType];
    }
    throw Error(`Unknown request type: ${requestType}`);
  }
}
