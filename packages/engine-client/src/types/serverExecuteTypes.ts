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
  cancel_and_place: EngineServerPlaceOrderResponse;
  link_signer: null;
}

export interface EngineServerExecuteSuccessResult<
  T extends EngineServerExecuteRequestType = EngineServerExecuteRequestType,
> {
  status: 'success';
  data: EngineServerExecuteResponseDataByType[T];
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

export type EngineServerExecuteResult<
  T extends EngineServerExecuteRequestType = EngineServerExecuteRequestType,
> = EngineServerExecuteSuccessResult<T> | EngineServerExecuteFailureResult;

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

export type EngineServerCancelOrdersParams = SignedTx<
  Omit<EIP712OrderCancellationValues, 'productIds'> & {
    // number[] is technically assignable to "Bytes", so we need to override the ByteFieldsToHex result here
    productIds: number[];
  }
>;

export type EngineServiceCancelAndPlaceParams = Omit<
  EngineServerCancelOrdersParams,
  'tx' | 'signature'
> & {
  cancel_tx: EngineServerCancelOrdersParams['tx'];
  cancel_signature: EngineServerCancelOrdersParams['signature'];
  place_order: EngineServerPlaceOrderParams;
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
  place_order: EngineServerPlaceOrderParams;
  cancel_orders: EngineServerCancelOrdersParams;
  cancel_and_place: EngineServiceCancelAndPlaceParams;
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
  orderParams: OrderParams;
};
