import {
  EIP712BurnLpValues,
  EIP712LinkSignerValues,
  EIP712LiquidateSubaccountValues,
  EIP712MintLpValues,
  EIP712OrderCancellationValues,
  EIP712OrderParams,
  EIP712OrderValues,
  EIP712ProductOrdersCancellationValues,
  EIP712WithdrawCollateralValues,
  SignedTx,
} from '@vertex-protocol/contracts';
import { EngineServerQueryOrderResponse } from './serverQueryTypes';

export interface EngineServerExecutePlaceOrderResponse {
  digest: string;
}

export interface EngineServerExecuteCancelOrdersResponse {
  cancelled_orders: EngineServerQueryOrderResponse[];
}

export interface EngineServerExecuteExecuteResponseDataByType {
  liquidate_subaccount: null;
  withdraw_collateral: null;
  mint_lp: null;
  burn_lp: null;
  place_order: EngineServerExecutePlaceOrderResponse;
  cancel_product_orders: EngineServerExecuteCancelOrdersResponse;
  cancel_orders: EngineServerExecuteCancelOrdersResponse;
  cancel_and_place: EngineServerExecutePlaceOrderResponse;
  link_signer: null;
}

export interface EngineServerExecuteSuccessResult<
  T extends EngineServerExecuteRequestType = EngineServerExecuteRequestType,
> {
  status: 'success';
  data: EngineServerExecuteExecuteResponseDataByType[T];
  signature: string;
  request_type: EngineServerExecuteResultRequestType;
  // NOTE: `id` is excluded from the response to avoid parsing issues.
  // type of `id` on the backend is `u64` which can overflow until we introduce proper parsing on the SDK.
}

export interface EngineServerExecuteFailureResult {
  status: 'failure';
  signature: string;
  error: string;
  error_code: number;
  request_type: EngineServerExecuteResultRequestType;
}

export type EngineServerExecuteResult<
  T extends EngineServerExecuteRequestType = EngineServerExecuteRequestType,
> = EngineServerExecuteSuccessResult<T> | EngineServerExecuteFailureResult;

type EngineServerExecuteResultRequestType = {
  [K in keyof EngineServerExecuteRequestByType]: `execute_${K}`;
}[keyof EngineServerExecuteRequestByType];

export interface EngineServerExecutePlaceOrderParams {
  id: number | null;
  product_id: number;
  order: EIP712OrderValues;
  // Bytes
  signature: string;
  // Engine defaults this to true
  spot_leverage: boolean | null;
}

export type EngineServerExecuteCancelOrdersParams = SignedTx<
  Omit<EIP712OrderCancellationValues, 'productIds'> & {
    // number[] is technically assignable to "Bytes", so we need to override the ByteFieldsToHex result here
    productIds: number[];
  }
>;

export type EngineServerCancelAndPlaceParams = Omit<
  EngineServerExecuteCancelOrdersParams,
  'tx' | 'signature'
> & {
  cancel_tx: EngineServerExecuteCancelOrdersParams['tx'];
  cancel_signature: EngineServerExecuteCancelOrdersParams['signature'];
  place_order: EngineServerExecutePlaceOrderParams;
};

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
  place_order: EngineServerExecutePlaceOrderParams;
  cancel_orders: EngineServerExecuteCancelOrdersParams;
  cancel_and_place: EngineServerCancelAndPlaceParams;
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

export type EngineServerExecutePlaceOrderPayload = {
  payload: EngineServerExecuteRequestByType['place_order'];
  orderParams: EIP712OrderParams;
};
