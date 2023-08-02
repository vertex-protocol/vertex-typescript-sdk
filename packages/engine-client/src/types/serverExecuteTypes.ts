import {
  EIP712BurnLpValues,
  EIP712LinkSignerValues,
  EIP712LiquidateSubaccountValues,
  EIP712MintLpValues,
  EIP712OrderCancellationValues,
  EIP712OrderValues,
  EIP712ProductOrdersCancellationValues,
  EIP712WithdrawCollateralValues,
  OrderParams,
  SignedTx,
} from '@vertex-protocol/contracts';
import { RequireExactlyOne } from '@vertex-protocol/utils';
import { EngineServerGetOrderResponse } from './serverQueryTypes';

export interface EngineServerPlaceOrderResponse {
  digest: string;
}

export interface EngineServerCancelOrdersResponse {
  cancelled_orders: EngineServerGetOrderResponse[];
}

export interface EngineServerExecuteResponseDataByType {
  liquidate_subaccount: null;
  withdraw_collateral: null;
  mint_lp: null;
  burn_lp: null;
  place_order: EngineServerPlaceOrderResponse;
  cancel_product_orders: EngineServerCancelOrdersResponse;
  cancel_orders: EngineServerCancelOrdersResponse;
  link_signer: null;
}

export interface EngineServerExecuteSuccessResult<
  TExecuteType extends keyof EngineServerExecuteResponseDataByType = EngineServerExecuteRequestType,
> {
  status: 'success';
  data: EngineServerExecuteResponseDataByType[TExecuteType];
  signature: string;
  request_type: EngineServerExecuteResultRequestType;
}

export interface EngineServerExecuteFailureResult {
  status: 'failure';
  signature: string;
  error: string;
  error_code: number;
  request_type: EngineServerExecuteResultRequestType;
}

export type EngineServerExecuteResult =
  | EngineServerExecuteSuccessResult
  | EngineServerExecuteFailureResult;

type EngineServerExecuteResultRequestType = {
  [K in keyof EngineServerExecuteRequestByType]: `execute_${K}`;
}[keyof EngineServerExecuteRequestByType];

export interface EngineServerPlaceOrderParams {
  product_id: number;
  order: EIP712OrderValues;
  // Bytes
  signature: string;
  // Engine defaults this to true
  spot_leverage: boolean | null;
}

type WithSpotLeverage<T> = T & {
  spot_leverage: boolean | null;
};

export interface EngineServerExecuteRequestByType {
  liquidate_subaccount: SignedTx<EIP712LiquidateSubaccountValues>;
  withdraw_collateral: WithSpotLeverage<
    SignedTx<EIP712WithdrawCollateralValues>
  >;
  mint_lp: WithSpotLeverage<SignedTx<EIP712MintLpValues>>;
  burn_lp: SignedTx<EIP712BurnLpValues>;
  place_order: EngineServerPlaceOrderParams;
  cancel_orders: SignedTx<
    Omit<EIP712OrderCancellationValues, 'productIds'> & {
      // number[] is technically assignable to "Bytes", so we need to override the ByteFieldsToHex result here
      productIds: number[];
    }
  >;
  cancel_product_orders: SignedTx<
    Omit<EIP712ProductOrdersCancellationValues, 'productIds'> & {
      // number[] is technically assignable to "Bytes", so we need to override the ByteFieldsToHex result here
      productIds: number[];
    }
  >;
  link_signer: SignedTx<EIP712LinkSignerValues>;
}

export type EngineServerExecuteRequestType =
  keyof EngineServerExecuteRequestByType;

export type EngineServerExecuteRequest =
  RequireExactlyOne<EngineServerExecuteRequestByType>;

export type EngineServerExecutePlaceOrderPayload = {
  payload: EngineServerExecuteRequestByType['place_order'];
  orderParams: OrderParams;
};
