import {
  EIP712LiquidateSubaccountValues,
  MintLpParams,
  OrderParams,
  SignableRequestTypeToEIP712Values,
  WithdrawCollateralParams,
} from '@vertex-protocol/contracts';
import { EngineServerExecutionResult } from './serverExecuteTypes';

export type WithoutNonce<T extends { nonce: unknown }> = Omit<T, 'nonce'>;

export type WithOptionalTx<
  T extends {
    nonce: unknown;
    tx?: SignableRequestTypeToEIP712Values[keyof SignableRequestTypeToEIP712Values];
  },
> = WithoutNonce<T> & {
  nonce?: string;
  signature?: string;
};

export type OrderParamsWithoutNonce = WithoutNonce<OrderParams>;

type WithSpotLeverage<T> = T & {
  spotLeverage?: boolean;
};

export type EngineWithdrawCollateralParams =
  WithSpotLeverage<WithdrawCollateralParams>;

export type EngineMintLpParams = WithSpotLeverage<MintLpParams>;

export interface PlaceOrderParams {
  productId: number;
  orderbookAddr: string;
  order: OrderParams;
  // If not given, engine defaults to true (leverage/borrow enabled)
  spotLeverage?: boolean;
}

export type PlaceOrderParamsWithoutNonce = Omit<PlaceOrderParams, 'order'> & {
  order: OrderParamsWithoutNonce;
};

export interface OrderActionResult extends EngineServerExecutionResult {
  digest: string;
}
