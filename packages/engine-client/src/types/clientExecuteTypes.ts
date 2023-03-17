import {
  BurnLpParams,
  LiquidateSubaccountParams,
  MintLpParams,
  OrderCancellationParams,
  OrderParams,
  WithdrawCollateralParams,
} from '@vertex-protocol/contracts';
import { EngineServerExecutionResult } from './serverExecuteTypes';

export type WithoutNonce<T extends { nonce: unknown }> = Omit<T, 'nonce'>;

export type WithOptionalSignature<T> = T & {
  signature?: string;
};

export type WithOptionalNonce<T> = T & {
  nonce?: string;
};

export type WithOptionalDigest<T> = T & {
  digest?: string;
};

export type OrderParamsWithoutNonce = WithoutNonce<OrderParams>;

export type OrderParamsWithOptionalNonce =
  WithOptionalNonce<OrderParamsWithoutNonce>;

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

export type PlaceOrderParamsWithOptionalTxFields = WithOptionalDigest<
  WithOptionalSignature<
    Omit<PlaceOrderParams, 'order'> & {
      order: OrderParamsWithOptionalNonce;
    }
  >
>;

export interface OrderActionResult extends EngineServerExecutionResult {
  digest: string;
}

export type OrderCancellationParamsWithOptionalSignature =
  WithOptionalSignature<
    WithOptionalNonce<Omit<OrderCancellationParams, 'nonce'>>
  >;

export type LiquidateSubaccountParamsWithOptionalSignature =
  WithOptionalSignature<
    WithOptionalNonce<Omit<LiquidateSubaccountParams, 'nonce'>>
  >;

export type EngineWithdrawCollateralParamsWithOptionalSignature =
  WithOptionalSignature<
    WithOptionalNonce<Omit<EngineWithdrawCollateralParams, 'nonce'>>
  >;

export type EngineMintLpParamsWithOptionalSignature = WithOptionalSignature<
  WithOptionalNonce<Omit<EngineMintLpParams, 'nonce'>>
>;

export type BurnLpParamsWithOptionalSignature = WithOptionalSignature<
  WithOptionalNonce<Omit<BurnLpParams, 'nonce'>>
>;
