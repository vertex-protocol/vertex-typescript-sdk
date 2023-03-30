import {
  BurnLpParams,
  LiquidateSubaccountParams,
  MintLpParams,
  OrderCancellationParams,
  OrderParams,
  ProductOrdersCancellationParams,
  WithdrawCollateralParams,
} from '@vertex-protocol/contracts';
import { RequireExactlyOne } from '@vertex-protocol/utils';
import { EngineServerExecutionResult } from './serverExecuteTypes';

/**
 * Either verifying address or signature must be provided;
 * If signature is not provided, the verifying address with the engine signer will be used to sign.
 */
export type SignatureParams =
  | {
      // Endpoint address for all executes except order placement
      verifyingAddr: string;
    }
  | {
      signature: string;
    };

export type WithoutNonce<T extends { nonce: unknown }> = Omit<T, 'nonce'>;

type WithSpotLeverage<T> = T & {
  spotLeverage?: boolean;
};

export type WithBaseEngineExecuteParams<T> = T &
  SignatureParams & {
    nonce?: string;
  };

export type EngineWithdrawCollateralParams =
  WithSpotLeverage<WithdrawCollateralParams>;

export type EngineMintLpParams = WithSpotLeverage<MintLpParams>;

export type EngineOrderParams = WithoutNonce<OrderParams>;

export type EngineExecutePlaceOrderParams = WithBaseEngineExecuteParams<{
  productId: number;
  order: EngineOrderParams;
  // If not given, engine defaults to true (leverage/borrow enabled)
  spotLeverage?: boolean;
}>;

export type EngineExecuteLiquidateSubaccountParams =
  WithBaseEngineExecuteParams<LiquidateSubaccountParams>;

export type EngineExecuteMintLpParams = WithBaseEngineExecuteParams<
  WithoutNonce<EngineMintLpParams>
>;

export type EngineExecuteBurnLpParams = WithBaseEngineExecuteParams<
  WithoutNonce<BurnLpParams>
>;

export type EngineExecuteWithdrawCollateralParams = WithBaseEngineExecuteParams<
  WithoutNonce<WithSpotLeverage<EngineWithdrawCollateralParams>>
>;

export type EngineExecuteCancelOrdersParams = WithBaseEngineExecuteParams<
  WithoutNonce<OrderCancellationParams>
>;

export type EngineExecuteCancelProductOrdersParams =
  WithBaseEngineExecuteParams<WithoutNonce<ProductOrdersCancellationParams>>;

export interface EngineExecuteRequestParamsByType {
  liquidate_subaccount: EngineExecuteLiquidateSubaccountParams;
  mint_lp: EngineExecuteMintLpParams;
  withdraw_collateral: EngineExecuteWithdrawCollateralParams;
  burn_lp: EngineExecuteBurnLpParams;
  place_order: EngineExecutePlaceOrderParams;
  cancel_orders: EngineExecuteCancelOrdersParams;
  cancel_product_orders: EngineExecuteCancelProductOrdersParams;
}

export type EngineExecuteRequestParamsType =
  keyof EngineExecuteRequestParamsByType;

export type EngineExecuteRequestParams =
  RequireExactlyOne<EngineExecuteRequestParamsType>;

export interface EngineExecutePlaceOrderResult
  extends EngineServerExecutionResult {
  orderParams: OrderParams;
}
