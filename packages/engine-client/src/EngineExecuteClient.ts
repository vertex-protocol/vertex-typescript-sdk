import {
  getOrderDigest,
  getVertexEIP712Values,
  LiquidateSubaccountParams,
  WithdrawCollateralParams,
} from '@vertex-protocol/contracts';
import {
  CancelOrderParams,
  EngineServerOrderParams,
  OrderActionResult,
  PlaceOrderParams,
} from './types';
import { EngineBaseClient } from './EngineBaseClient';

type WithEndpointAddr<T> = T & {
  endpointAddr: string;
};

// TODO: Lots of typehacks here, should be resolved by adding typing to getVertexEIP712Values
export class EngineExecuteClient extends EngineBaseClient {
  async liquidateSubaccount(
    params: WithEndpointAddr<LiquidateSubaccountParams>,
  ) {
    const signature = await this.sign(
      'liquidate_subaccount',
      params.endpointAddr,
      params,
    );
    return this.execute('liquidate_subaccount', {
      signature,
      tx: getVertexEIP712Values(
        'liquidate_subaccount',
        params,
      ) as unknown as LiquidateSubaccountParams,
    });
  }

  async withdrawCollateral(params: WithEndpointAddr<WithdrawCollateralParams>) {
    const signature = await this.sign(
      'withdraw_collateral',
      params.endpointAddr,
      params,
    );
    return this.execute('withdraw_collateral', {
      signature,
      tx: getVertexEIP712Values(
        'withdraw_collateral',
        params,
      ) as unknown as WithdrawCollateralParams,
    });
  }

  async placeOrder(params: PlaceOrderParams): Promise<OrderActionResult> {
    const digest = await getOrderDigest({
      chainId: await this.getSigningChainId(),
      order: params.order,
      orderbookAddress: params.orderbookAddr,
    });
    const executeResult = await this.execute('place_order', {
      product_id: params.productId,
      order: getVertexEIP712Values(
        'place_order',
        params.order,
      ) as EngineServerOrderParams,
      signature: await this.sign(
        'place_order',
        params.orderbookAddr,
        params.order,
      ),
    });

    return { digest, ...executeResult };
  }

  async cancelOrder(params: CancelOrderParams): Promise<OrderActionResult> {
    const digest = await getOrderDigest({
      chainId: await this.getSigningChainId(),
      order: params.order,
      orderbookAddress: params.orderbookAddr,
    });
    const executeResult = await this.execute('cancel_order', {
      product_id: params.productId,
      cancellation: getVertexEIP712Values(
        'cancel_order',
        params.order,
      ) as EngineServerOrderParams,
      signature: await this.sign(
        'cancel_order',
        params.orderbookAddr,
        params.order,
      ),
    });

    return { digest, ...executeResult };
  }

  // TODO: settle PNL
}
