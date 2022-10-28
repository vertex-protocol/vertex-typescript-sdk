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
import { BigNumber } from 'ethers';

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
    productId: params.productId,
    amount: BigNumber.from(params.amount).toString(),
    nonce: BigNumber.from(params.nonce).toNumber(),
  };
}

function getOrderValues(params: OrderParams) {
  return {
    sender: params.sender,
    subaccountName: params.subaccountName,
    priceX18: toX18(params.price).toString(),
    amount: BigNumber.from(params.amount).toString(),
    expiration: BigNumber.from(params.expiration).toString(),
    nonce: BigNumber.from(params.nonce).toNumber(),
  };
}

function getLiquidateSubaccountValues(params: LiquidateSubaccountParams) {
  return {
    sender: params.sender,
    subaccountName: params.subaccountName,
    liquidateeId: params.liquidateeId.toString(),
    productId: params.productId,
    amount: BigNumber.from(params.amount).toString(),
    nonce: BigNumber.from(params.nonce).toNumber(),
  };
}
