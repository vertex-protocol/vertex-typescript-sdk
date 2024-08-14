import {
  EngineExecuteRequestParamsByType,
  WithSignature,
} from '@vertex-protocol/engine-client';
import { BaseVertexAPI } from '../base';
import { EIP712OrderParams } from '@vertex-protocol/contracts';

/**
 * Builds execute messages as expected by the server to send over Websocket.
 * @example vertexClient.ws.execute.buildPlaceOrderMessage(...)
 */
export class WebSocketExecuteAPI extends BaseVertexAPI {
  /**
   * Builds ws message for the `liquidate_subaccount` execute action.
   * @param params LiquidateSubaccount params.
   * @returns `liquidate_subaccount` execute message
   */
  async buildLiquidateSubaccountMessage(
    params: EngineExecuteRequestParamsByType['liquidate_subaccount'],
  ) {
    return this.context.engineClient.payloadBuilder.buildLiquidateSubaccountPayload(
      params,
    );
  }

  /**
   * Builds ws message for the `withdraw_collateral` execute action.
   * @param params WithdrawCollateral params.
   * @returns `liquidate_subaccount` execute message
   */
  async buildWithdrawCollateralMessage(
    params: EngineExecuteRequestParamsByType['withdraw_collateral'],
  ) {
    return this.context.engineClient.payloadBuilder.buildWithdrawCollateralPayload(
      params,
    );
  }

  /**
   * Builds ws message for the `mint_lp` execute action.
   * @param params MintLp params.
   * @returns `mint_lp` execute message
   */
  async buildMintLpMessage(
    params: EngineExecuteRequestParamsByType['mint_lp'],
  ) {
    return this.context.engineClient.payloadBuilder.buildMintLpPayload(params);
  }

  /**
   * Builds ws message for the `burn_lp` execute action.
   * @param params BurnLp params.
   * @returns `burn_lp` execute message
   */
  async buildBurnLpMessage(
    params: EngineExecuteRequestParamsByType['burn_lp'],
  ) {
    return this.context.engineClient.payloadBuilder.buildBurnLpPayload(params);
  }

  /**
   * Builds ws message for the `place_order` execute action.
   * @param params PlaceOrder params.
   * @returns `place_order` execute message
   */
  buildPlaceOrderMessage(
    params: WithSignature<
      EngineExecuteRequestParamsByType['place_order'] & {
        order: EIP712OrderParams;
      }
    >,
  ) {
    return this.context.engineClient.payloadBuilder.buildPlaceOrderPayloadSync(
      params,
    );
  }

  /**
   * Builds ws message for the `cancel_orders` execute action.
   * @param params PlaceOrder params.
   * @returns `cancel_orders` execute message
   */
  buildCancelOrdersMessage(
    params: WithSignature<
      EngineExecuteRequestParamsByType['cancel_orders'] & { nonce: string }
    >,
  ) {
    return this.context.engineClient.payloadBuilder.buildCancelOrdersPayloadSync(
      params,
    );
  }
}
