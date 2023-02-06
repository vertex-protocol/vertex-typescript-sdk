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
import { subaccountToBytes32 } from '../utils';
import {
  EIP712BurnLpValues,
  EIP712LiquidateSubaccountValues,
  EIP712MintLpValues,
  EIP712OrderCancellationValues,
  EIP712OrderValues,
  EIP712WithdrawCollateralValues,
  SignableRequestTypeToEIP712Values,
} from './eip712ValueTypes';

/**
 * Returns the EIP712 compatible values for signing.
 *
 * @param requestType
 * @param params
 */
export function getVertexEIP712Values<TReqType extends SignableRequestType>(
  requestType: TReqType,
  params: SignableRequestTypeToParams[TReqType],
): SignableRequestTypeToEIP712Values[TReqType] {
  // Typescript does not yet support type narrowing + generic lookup types, hence the hacks here
  switch (requestType) {
    case 'withdraw_collateral':
      return getWithdrawCollateralValues(
        params as WithdrawCollateralParams,
      ) as SignableRequestTypeToEIP712Values[TReqType];
    case 'mint_lp':
      return getMintLpValues(
        params as MintLpParams,
      ) as SignableRequestTypeToEIP712Values[TReqType];
    case 'burn_lp':
      return getBurnLpValues(
        params as BurnLpParams,
      ) as SignableRequestTypeToEIP712Values[TReqType];
    case 'place_order':
      return getOrderValues(
        params as OrderParams,
      ) as SignableRequestTypeToEIP712Values[TReqType];
    case 'cancel_orders':
      return getOrderCancellationValues(
        params as OrderCancellationParams,
      ) as SignableRequestTypeToEIP712Values[TReqType];
    case 'liquidate_subaccount':
      return getLiquidateSubaccountValues(
        params as LiquidateSubaccountParams,
      ) as SignableRequestTypeToEIP712Values[TReqType];
  }
  throw Error(`Unknown request type: ${requestType}`);
}

function getWithdrawCollateralValues(
  params: WithdrawCollateralParams,
): EIP712WithdrawCollateralValues {
  return {
    sender: subaccountToBytes32({
      owner: params.sender,
      name: params.subaccountName,
    }),
    productId: params.productId,
    amount: BigNumber.from(params.amount).toString(),
    nonce: BigNumber.from(params.nonce).toString(),
  };
}

function getMintLpValues(params: MintLpParams): EIP712MintLpValues {
  return {
    sender: subaccountToBytes32({
      owner: params.sender,
      name: params.subaccountName,
    }),
    productId: params.productId,
    amountBase: params.amountBase.toString(),
    quoteAmountLow: params.quoteAmountLow.toString(),
    quoteAmountHigh: params.quoteAmountHigh.toString(),
    nonce: BigNumber.from(params.nonce).toString(),
  };
}

function getBurnLpValues(params: BurnLpParams): EIP712BurnLpValues {
  return {
    sender: subaccountToBytes32({
      owner: params.sender,
      name: params.subaccountName,
    }),
    productId: params.productId,
    amount: params.amount.toString(),
    nonce: BigNumber.from(params.nonce).toString(),
  };
}

function getOrderValues(params: OrderParams): EIP712OrderValues {
  return {
    sender: subaccountToBytes32({
      owner: params.sender,
      name: params.subaccountName,
    }),
    priceX18: toX18(params.price).toString(),
    amount: BigNumber.from(params.amount).toString(),
    expiration: BigNumber.from(params.expiration).toString(),
    nonce: BigNumber.from(params.nonce).toString(),
  };
}

function getOrderCancellationValues(
  params: OrderCancellationParams,
): EIP712OrderCancellationValues {
  return {
    sender: subaccountToBytes32({
      owner: params.sender,
      name: params.subaccountName,
    }),
    productIds: params.productIds,
    digests: params.digests,
    nonce: BigNumber.from(params.nonce).toString(),
  };
}

function getLiquidateSubaccountValues(
  params: LiquidateSubaccountParams,
): EIP712LiquidateSubaccountValues {
  return {
    sender: subaccountToBytes32({
      owner: params.sender,
      name: params.subaccountName,
    }),
    liquidatee: subaccountToBytes32({
      owner: params.liquidateeOwner,
      name: params.liquidateeName,
    }),
    mode: params.mode,
    healthGroup: params.healthGroup.toString(),
    amount: BigNumber.from(params.amount).toString(),
    nonce: BigNumber.from(params.nonce).toString(),
  };
}
