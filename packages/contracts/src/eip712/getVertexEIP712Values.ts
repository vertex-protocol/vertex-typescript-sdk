import {
  SignableRequestType,
  SignableRequestTypeToParams,
} from './signableRequestType';
import {
  LiquidateSubaccountParams,
  OrderParams,
  WithdrawCollateralParams,
} from './signatureParamTypes';
import { toX18 } from '@vertex-protocol/utils';

/**
 * Returns the EIP712 compatible values for signing.
 *
 * @param requestType
 * @param params
 */
export function getVertexEIP712Values<TReqType extends SignableRequestType>(
  requestType: TReqType,
  params: SignableRequestTypeToParams[TReqType],
): Record<string, unknown> {
  switch (requestType) {
    case 'withdraw_collateral':
      return getWithdrawCollateralValues(params as WithdrawCollateralParams);
    case 'place_order':
      return getOrderValues(params as OrderParams);
    case 'cancel_order':
      return getOrderValues(params as OrderParams);
    case 'liquidate_subaccount':
      return getLiquidateSubaccountValues(params as LiquidateSubaccountParams);
  }
  throw Error(`Unknown request type: ${requestType}`);
}

function getWithdrawCollateralValues(params: WithdrawCollateralParams) {
  return {
    sender: params.sender,
    subaccountName: params.subaccountName,
    productId: params.productId.toString(),
    amount: params.amount.toString(),
    nonce: params.nonce.toString(),
  };
}

function getOrderValues(params: OrderParams) {
  return {
    sender: params.sender,
    subaccountName: params.subaccountName,
    priceX18: toX18(params.price).toString(),
    amount: params.amount.toString(),
    expiration: params.expiration.toString(),
    nonce: params.nonce.toString(),
  };
}

function getLiquidateSubaccountValues(params: LiquidateSubaccountParams) {
  return {
    sender: params.sender,
    subaccountName: params.subaccountName,
    liquidateeId: params.liquidateeSubaccountId.toString(),
    productId: params.productId.toString(),
    amount: params.amount.toString(),
    nonce: params.nonce.toString(),
  };
}
