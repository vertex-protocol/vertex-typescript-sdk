import {
  EIP712CancelOrdersParams,
  EIP712CancelProductOrdersParams,
  Subaccount,
} from '@vertex-protocol/contracts';
import {
  EngineOrderParams,
  EngineServerExecuteResult,
} from '@vertex-protocol/engine-client';
import { BigDecimal, BigDecimalish } from '@vertex-protocol/utils';
import { BigNumberish } from 'ethers';
import { TriggerServerOrder } from './serverQueryTypes';

type WithOptionalNonce<T> = Omit<T, 'nonce'> & { nonce?: string };

export type TriggerCriteriaType =
  | 'oracle_price_above'
  | 'oracle_price_below'
  | 'last_price_above'
  | 'last_price_below';

export type TriggerCriteria = {
  type: TriggerCriteriaType;
  triggerPrice: BigDecimalish;
};

export type TriggerOrderStatus =
  | {
      type: 'pending';
    }
  | {
      type: 'cancelled';
      reason: string;
    }
  | {
      type: 'triggered';
      result: EngineServerExecuteResult;
    }
  | {
      type: 'internal_error';
      error: string;
    };

interface SignatureParams {
  // Orderbook address for placement, endpoint address for cancellation & listing
  verifyingAddr: string;
  chainId: BigNumberish;
}

/**
 * Executes
 */

export interface TriggerExecutePlaceOrderParams extends SignatureParams {
  id?: number;
  productId: number;
  order: EngineOrderParams;
  triggerCriteria: TriggerCriteria;
  // If not given, engine defaults to true (leverage/borrow enabled)
  spotLeverage?: boolean;
  digest?: string;
  nonce?: string;
}

export type TriggerExecuteCancelOrdersParams = SignatureParams &
  WithOptionalNonce<EIP712CancelOrdersParams>;

export type TriggerExecuteCancelProductOrdersParams = SignatureParams &
  WithOptionalNonce<EIP712CancelProductOrdersParams>;

export interface TriggerExecuteRequestParamsByType {
  place_order: TriggerExecutePlaceOrderParams;
  cancel_orders: TriggerExecuteCancelOrdersParams;
  cancel_product_orders: TriggerExecuteCancelProductOrdersParams;
}

/**
 * Queries
 */

export interface TriggerQueryListTriggerOrdersParams
  extends Subaccount,
    SignatureParams {
  // In millis, defaults to 90s in the future
  recvTime?: BigDecimal;
  // If not given, defaults to all products
  productId?: number;
  // Pending trigger orders only, ignores cancelled & triggered orders
  pending: boolean;
  // In seconds
  maxUpdateTimeInclusive?: number;
  limit?: number;
}

export interface TriggerOrder {
  productId: number;
  triggerCriteria: TriggerCriteria;
  price: BigDecimal;
  amount: BigDecimal;
  expiration: BigDecimal;
  nonce: string;
  digest: string;
}

export interface TriggerOrderInfo {
  order: TriggerOrder;
  serverOrder: TriggerServerOrder;
  status: TriggerOrderStatus;
  updatedAt: number;
}

export interface TriggerQueryListTriggerOrdersResponse {
  orders: TriggerOrderInfo[];
}

export interface TriggerQueryRequestParamsByType {
  list_trigger_orders: TriggerQueryListTriggerOrdersParams;
}

export interface TriggerQueryResponseByType {
  list_trigger_orders: TriggerQueryListTriggerOrdersResponse;
}
