/* eslint-disable no-case-declarations */
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

// TODO: all values need to be stringified

/**
 * Returns the EIP712 compatible values for signing.
 * TODO: Better typing here to remove stuff like `as DepositCollateralParams`?
 * TODO: lift individual handlers into functions to get rid of eslint disable
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
      const depositParams = params as DepositCollateralParams;
      return {
        sender: depositParams.sender,
        subaccountName: depositParams.subaccountName,
        productId: depositParams.productId,
        amount: depositParams.amount,
        nonce: depositParams.nonce,
      };
    case 'withdrawCollateral':
      const withdrawParams = params as WithdrawCollateralParams;
      return {
        sender: withdrawParams.sender,
        subaccountName: withdrawParams.subaccountName,
        productId: withdrawParams.productId,
        amount: withdrawParams.amount,
        nonce: withdrawParams.nonce,
      };
    case 'placeOrder':
      const placeParams = params as OrderParams;
      return {
        subaccount: placeParams.subaccountId,
        priceX18: toX18(placeParams.price),
        amount: placeParams.amount,
        expiration: placeParams.expiration,
        nonce: placeParams.nonce,
      };
    case 'cancelOrder':
      const cancelParams = params as OrderParams;
      return {
        subaccount: cancelParams.subaccountId,
        priceX18: toX18(cancelParams.price),
        amount: cancelParams.amount,
        expiration: cancelParams.expiration,
        nonce: cancelParams.nonce,
      };
    case 'liquidateSubaccount':
      const liquidateParams = params as LiquidateSubaccountParams;
      return {
        sender: liquidateParams.sender,
        subaccountName: liquidateParams.subaccountName,
        liquidateeId: liquidateParams.liquidateeSubaccountId,
        productId: liquidateParams.productId,
        amount: liquidateParams.amount,
        nonce: liquidateParams.nonce,
      };
  }
  throw Error(`Unknown request type: ${requestType}`);
}
