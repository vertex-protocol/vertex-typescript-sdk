import {
  EIP712ListTriggerOrdersValues,
  SignedTx,
} from '@vertex-protocol/contracts';
import { TriggerServerExecutePlaceOrderParams } from './serverExecuteTypes';
import { EngineServerExecuteResult } from '@vertex-protocol/engine-client';

export type TriggerServerOrderStatus =
  | 'pending'
  | {
      // Result from sending to engine
      triggered: EngineServerExecuteResult;
    }
  | {
      // Reason string
      cancelled: string;
    };

/**
 * Request types
 */

export interface TriggerServerQueryListOrdersParams
  extends SignedTx<EIP712ListTriggerOrdersValues> {
  product_ids: number[];
  pending: boolean;
  max_update_time?: number;
  limit?: number;
}

export interface TriggerServerQueryRequestByType {
  list_trigger_orders: TriggerServerQueryListOrdersParams;
}

export type TriggerServerQueryRequestType =
  keyof TriggerServerQueryRequestByType;

/**
 * Response types
 */

export type TriggerServerOrder = TriggerServerExecutePlaceOrderParams & {
  // Digest is always populated here
  digest: string;
};

export interface TriggerServerOrderInfo {
  order: TriggerServerOrder;
  status: TriggerServerOrderStatus;
  updated_at: number;
}

export interface TriggerServerQueryListOrdersResponse {
  orders: TriggerServerOrderInfo[];
}

export interface TriggerServerQueryResponseByType {
  list_trigger_orders: TriggerServerQueryListOrdersResponse;
}

export interface TriggerServerQuerySuccessResponse<
  TQueryType extends keyof TriggerServerQueryResponseByType = TriggerServerQueryRequestType,
> {
  status: 'success';
  data: TriggerServerQueryResponseByType[TQueryType];
}

export interface TriggerServerQueryFailureResponse {
  status: 'failure';
  error: string;
  error_code: number;
}

export type TriggerServerQueryResponse<
  TQueryType extends keyof TriggerServerQueryResponseByType = TriggerServerQueryRequestType,
> =
  | TriggerServerQuerySuccessResponse<TQueryType>
  | TriggerServerQueryFailureResponse;
