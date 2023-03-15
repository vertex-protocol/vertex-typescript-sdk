import {
  EIP712BurnLpValues,
  EIP712LiquidateSubaccountValues,
  EIP712MintLpValues,
  EIP712OrderCancellationValues,
  EIP712OrderValues,
  EIP712WithdrawCollateralValues,
  OrderParams,
  SignedTx,
} from '@vertex-protocol/contracts';
import { Bytes } from 'ethers/lib/utils';
import { RequireExactlyOne } from '@vertex-protocol/utils';

type ByteFieldsToHex<T> = {
  [K in keyof T]: T[K] extends Bytes ? string : T[K];
};

export interface EngineServerExecutionResult {
  status: 'success' | 'failure';
  error?: {
    message: string; // Revert message, defaulting to "" if none
  };
}

export interface EngineServerPlaceOrderParams {
  product_id: number;
  order: ByteFieldsToHex<EIP712OrderValues>;
  // Bytes
  signature: string;
  // Engine defaults this to true
  spot_leverage: boolean | null;
}

type WithSpotLeverage<T> = T & {
  spot_leverage: boolean | null;
};

export interface EngineServerExecuteRequestByType {
  liquidate_subaccount: SignedTx<
    ByteFieldsToHex<EIP712LiquidateSubaccountValues>
  >;
  withdraw_collateral: WithSpotLeverage<
    SignedTx<ByteFieldsToHex<EIP712WithdrawCollateralValues>>
  >;
  mint_lp: WithSpotLeverage<SignedTx<ByteFieldsToHex<EIP712MintLpValues>>>;
  burn_lp: SignedTx<ByteFieldsToHex<EIP712BurnLpValues>>;
  place_order: EngineServerPlaceOrderParams;
  cancel_orders: SignedTx<
    Omit<ByteFieldsToHex<EIP712OrderCancellationValues>, 'productIds'> & {
      // number[] is technically assignable to "Bytes", so we need to override the ByteFieldsToHex result here
      productIds: number[];
    }
  >;
}

export type EngineServerExecuteRequestType =
  keyof EngineServerExecuteRequestByType;

export type EngineServerExecuteRequest =
  RequireExactlyOne<EngineServerExecuteRequestByType>;

export type EngineServerExecutePlaceOrderPayload = {
  payload: EngineServerExecuteRequestByType['place_order'];
  orderParams: OrderParams;
};
