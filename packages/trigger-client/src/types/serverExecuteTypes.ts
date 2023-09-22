import { EIP712OrderValues } from '@vertex-protocol/contracts';
import {
  EngineServerExecuteRequestByType,
  EngineServerExecuteResult,
} from '@vertex-protocol/engine-client';

export type TriggerServerExecuteResult = EngineServerExecuteResult;

export type TriggerServerTriggerCriteria =
  // These trigger on fast oracle price
  | {
      price_above: string;
    }
  | {
      price_below: string;
    }
  // These trigger on last trade price
  | {
      last_price_above: string;
    }
  | {
      last_price_below: string;
    };

export interface TriggerServerExecutePlaceOrderParams {
  product_id: number;
  order: EIP712OrderValues;
  trigger: TriggerServerTriggerCriteria;
  signature: string;
  digest: string | null;
  // Trigger service defaults this to true
  spot_leverage: boolean | null;
}

export type TriggerServerExecuteCancelOrdersParams =
  EngineServerExecuteRequestByType['cancel_orders'];

export type TriggerServerExecuteCancelProductOrdersParams =
  EngineServerExecuteRequestByType['cancel_product_orders'];

export interface TriggerServerExecuteRequestByType {
  place_order: TriggerServerExecutePlaceOrderParams;
  cancel_orders: TriggerServerExecuteCancelOrdersParams;
  cancel_product_orders: TriggerServerExecuteCancelProductOrdersParams;
}

export type TriggerServerExecuteRequestType =
  keyof TriggerServerExecuteRequestByType;

export type TriggerServerExecuteResponse = TriggerServerExecuteResult;
