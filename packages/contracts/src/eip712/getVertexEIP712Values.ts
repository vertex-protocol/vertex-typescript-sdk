import {
  SignableRequestType,
  SignableRequestTypeToParams,
} from './signableRequestType';
import {
  DepositCollateralParams,
  LiquidateSubaccountParams,
  OrderParams,
  WithdrawCollateralParams,
} from './signatureParamTypes';
import { toX18 } from '@vertex-protocol/utils';

/**
 * Returns the EIP712 compatible values for signing.
 * TODO: Better typing here to remove stuff like `as DepositCollateralParams`?
 *
 * @param requestType
 * @param params
 */
export function getVertexEIP712Values<TReqType extends SignableRequestType>(
  requestType: TReqType,
  params: SignableRequestTypeToParams[TReqType],
): Record<string, unknown> {
  switch (requestType) {
    case 'depositCollateral':
      return getCollateralValues(params as DepositCollateralParams);
    case 'withdrawCollateral':
      return getCollateralValues(params as WithdrawCollateralParams);
    case 'placeOrder':
      return getOrderValues(params as OrderParams);
    case 'cancelOrder':
      return getOrderValues(params as OrderParams);
    case 'liquidateSubaccount':
      return getLiquidateSubaccountValues(params as LiquidateSubaccountParams);
  }
  throw Error(`Unknown request type: ${requestType}`);
}

function getCollateralValues(
  params: DepositCollateralParams | WithdrawCollateralParams,
) {
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
    subaccount: params.subaccountId.toString(),
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
