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
 */
export function getVertexEIP712Values<TReqType extends SignableRequestType>(
  requestType: TReqType,
  params: SignableRequestTypeToParams[TReqType],
): Record<string, unknown> {
  switch (requestType) {
    case 'withdraw_collateral':
      return getWithdrawCollateralValues(params as WithdrawCollateralParams);
    case 'mint_lp':
      return getMintLpValues(params as MintLpParams);
    case 'burn_lp':
      return getBurnLpValues(params as BurnLpParams);
    case 'place_order':
      return getOrderValues(params as OrderParams);
    case 'cancel_orders':
      return getOrderCancellationValues(params as OrderCancellationParams);
    case 'liquidate_subaccount':
      return getLiquidateSubaccountValues(params as LiquidateSubaccountParams);
  }
  throw Error(`Unknown request type: ${requestType}`);
}

function getMintLpValues(params: MintLpParams) {
  return {
    sender: subaccountToBytes32(params.sender, params.subaccountName),
    productId: params.productId,
    amountBase: params.amountBase.toString(),
    quoteAmountLow: params.quoteAmountLow.toString(),
    quoteAmountHigh: params.quoteAmountHigh.toString(),
    nonce: BigNumber.from(params.nonce).toNumber(),
  };
}

function getBurnLpValues(params: BurnLpParams) {
  return {
    sender: subaccountToBytes32(params.sender, params.subaccountName),
    productId: params.productId,
    amount: params.amount.toString(),
    nonce: BigNumber.from(params.nonce).toNumber(),
  };
}

function getWithdrawCollateralValues(params: WithdrawCollateralParams) {
  return {
    sender: subaccountToBytes32(params.sender, params.subaccountName),
    productId: params.productId,
    amount: BigNumber.from(params.amount).toString(),
    nonce: BigNumber.from(params.nonce).toNumber(),
  };
}

function getOrderValues(params: OrderParams) {
  return {
    sender: subaccountToBytes32(params.sender, params.subaccountName),
    priceX18: toX18(params.price).toString(),
    amount: BigNumber.from(params.amount).toString(),
    expiration: BigNumber.from(params.expiration).toString(),
    nonce: BigNumber.from(params.nonce).toString(),
  };
}

function getOrderCancellationValues(params: OrderCancellationParams) {
  return {
    sender: subaccountToBytes32(params.sender, params.subaccountName),
    productIds: params.productIds,
    digests: params.digests,
    nonce: BigNumber.from(params.nonce).toString(),
  };
}

function getLiquidateSubaccountValues(params: LiquidateSubaccountParams) {
  return {
    sender: subaccountToBytes32(params.sender, params.subaccountName),
    liquidatee: subaccountToBytes32(
      params.liquidateeOwner,
      params.liquidateeName,
    ),
    mode: params.mode,
    healthGroup: params.healthGroup.toString(),
    amount: BigNumber.from(params.amount).toString(),
    nonce: BigNumber.from(params.nonce).toNumber(),
  };
}
