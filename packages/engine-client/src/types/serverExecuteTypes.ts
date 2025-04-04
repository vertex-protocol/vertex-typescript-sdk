import {
  EIP712BurnLpValues,
  EIP712BurnVlpValues,
  EIP712IsolatedOrderParams,
  EIP712LinkSignerValues,
  EIP712LiquidateSubaccountValues,
  EIP712MintLpValues,
  EIP712MintVlpValues,
  EIP712OrderCancellationValues,
  EIP712OrderParams,
  EIP712OrderValues,
  EIP712ProductOrdersCancellationValues,
  EIP712TransferQuoteValues,
  EIP712WithdrawCollateralValues,
  SignedTx,
} from '@vertex-protocol/contracts';
import { EngineServerOrderResponse } from './serverQueryTypes';

export interface EngineServerPlaceOrderResponse {
  digest: string;
}

export interface EngineServerCancelOrdersResponse {
  cancelled_orders: EngineServerOrderResponse[];
}

export interface EngineServerExecuteResponseDataByType {
  burn_lp: null;
  burn_vlp: null;
  cancel_and_place: EngineServerPlaceOrderResponse;
  cancel_orders: EngineServerCancelOrdersResponse;
  cancel_product_orders: EngineServerCancelOrdersResponse;
  link_signer: null;
  liquidate_subaccount: null;
  mint_lp: null;
  mint_vlp: null;
  place_isolated_order: EngineServerPlaceOrderResponse;
  place_order: EngineServerPlaceOrderResponse;
  transfer_quote: null;
  withdraw_collateral: null;
}

export interface EngineServerExecuteSuccessResult<
  T extends EngineServerExecuteRequestType = EngineServerExecuteRequestType,
> {
  status: 'success';
  data: EngineServerExecuteResponseDataByType[T];
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

export interface EngineServerPlaceOrderParams {
  id: number | null;
  product_id: number;
  order: EIP712OrderValues;
  // Bytes
  signature: string;
  // Engine defaults this to true
  spot_leverage: boolean | null;
}

export interface EngineServerPlaceIsolatedOrderParams {
  id: number | null;
  product_id: number;
  isolated_order: EIP712OrderValues;
  // Bytes
  signature: string;
  // Engine defaults this to false
  borrow_margin: boolean | null;
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
  burn_lp: SignedTx<EIP712BurnLpValues>;
  burn_vlp: SignedTx<EIP712BurnVlpValues>;
  cancel_and_place: EngineServiceCancelAndPlaceParams;
  cancel_orders: EngineServerCancelOrdersParams;
  cancel_product_orders: SignedTx<
    Omit<EIP712ProductOrdersCancellationValues, 'productIds'> & {
      // number[] is technically assignable to "Bytes", so we need to override the ByteFieldsToHex result here
      productIds: number[];
    }
  >;
  link_signer: SignedTx<EIP712LinkSignerValues>;
  liquidate_subaccount: SignedTx<EIP712LiquidateSubaccountValues>;
  mint_lp: WithSpotLeverage<SignedTx<EIP712MintLpValues>>;
  mint_vlp: WithSpotLeverage<SignedTx<EIP712MintVlpValues>>;
  place_isolated_order: EngineServerPlaceIsolatedOrderParams;
  place_order: EngineServerPlaceOrderParams;
  transfer_quote: SignedTx<EIP712TransferQuoteValues>;
  withdraw_collateral: WithSpotLeverage<
    SignedTx<EIP712WithdrawCollateralValues>
  >;
}

export type EngineServerExecuteRequestType =
  keyof EngineServerExecuteRequestByType;

export interface EngineServerExecutePlaceOrderPayload {
  payload: EngineServerExecuteRequestByType['place_order'];
  orderParams: EIP712OrderParams;
}

export interface EngineServerExecutePlaceIsolatedOrderPayload {
  payload: EngineServerExecuteRequestByType['place_isolated_order'];
  orderParams: EIP712IsolatedOrderParams;
}
