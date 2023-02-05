import {
  SignableRequestType,
  SignableRequestTypeToParams,
} from './signableRequestType';
import {
  BurnLpParams,
  LiquidateSubaccountParams,
  MintLpParams,
  OrderCancellationParams,
  OrderParams,
  WithdrawCollateralParams,
} from './signatureParamTypes';
import { toX18 } from '@vertex-protocol/utils';
import { BigNumber } from 'ethers';
import { subaccountToBytes32, subaccountToHex } from '../utils';

/**
 * Returns the EIP712 compatible values for signing.
 *
 * @param requestType
 * @param params
 * @param signature whether values will be used to create EIP712 signature
 */
export function getVertexEIP712Values<TReqType extends SignableRequestType>(
  requestType: TReqType,
  params: SignableRequestTypeToParams[TReqType],
  isSignature = false,
): Record<string, unknown> {
  switch (requestType) {
    case 'withdraw_collateral':
      return getWithdrawCollateralValues(
        params as WithdrawCollateralParams,
        isSignature,
      );
    case 'mint_lp':
      return getMintLpValues(params as MintLpParams, isSignature);
    case 'burn_lp':
      return getBurnLpValues(params as BurnLpParams, isSignature);
    case 'place_order':
      return getOrderValues(params as OrderParams, isSignature);
    case 'cancel_orders':
      return getOrderCancellationValues(
        params as OrderCancellationParams,
        isSignature,
      );
    case 'liquidate_subaccount':
      return getLiquidateSubaccountValues(
        params as LiquidateSubaccountParams,
        isSignature,
      );
  }
  throw Error(`Unknown request type: ${requestType}`);
}

function getMintLpValues(params: MintLpParams, isSignature: boolean) {
  return {
    sender: getSender(params.sender, params.subaccountName, isSignature),
    productId: params.productId,
    amountBase: params.amountBase.toString(),
    quoteAmountLow: params.quoteAmountLow.toString(),
    quoteAmountHigh: params.quoteAmountHigh.toString(),
    nonce: BigNumber.from(params.nonce).toNumber(),
  };
}

function getBurnLpValues(params: BurnLpParams, isSignature: boolean) {
  return {
    sender: getSender(params.sender, params.subaccountName, isSignature),
    productId: params.productId,
    amount: params.amount.toString(),
    nonce: BigNumber.from(params.nonce).toNumber(),
  };
}

function getWithdrawCollateralValues(
  params: WithdrawCollateralParams,
  isSignature: boolean,
) {
  return {
    sender: getSender(params.sender, params.subaccountName, isSignature),
    productId: params.productId,
    amount: BigNumber.from(params.amount).toString(),
    nonce: BigNumber.from(params.nonce).toNumber(),
  };
}

function getOrderValues(params: OrderParams, isSignature: boolean) {
  return {
    sender: getSender(params.sender, params.subaccountName, isSignature),
    priceX18: toX18(params.price).toString(),
    amount: BigNumber.from(params.amount).toString(),
    expiration: BigNumber.from(params.expiration).toString(),
    nonce: BigNumber.from(params.nonce).toString(),
  };
}

function getOrderCancellationValues(
  params: OrderCancellationParams,
  isSignature: boolean,
) {
  return {
    sender: getSender(params.sender, params.subaccountName, isSignature),
    productIds: params.productIds,
    digests: params.digests,
    nonce: BigNumber.from(params.nonce).toString(),
  };
}

function getLiquidateSubaccountValues(
  params: LiquidateSubaccountParams,
  isSignature: boolean,
) {
  return {
    sender: getSender(params.sender, params.subaccountName, isSignature),
    liquidatee: subaccountToHex(params.liquidateeOwner, params.liquidateeName),
    mode: params.mode,
    healthGroup: params.healthGroup.toString(),
    amount: BigNumber.from(params.amount).toString(),
    nonce: BigNumber.from(params.nonce).toNumber(),
  };
}

function getSender(
  owner: string,
  subaccountName: string,
  isSignature: boolean,
) {
  return isSignature
    ? subaccountToBytes32(owner, subaccountName)
    : subaccountToHex(owner, subaccountName);
}
