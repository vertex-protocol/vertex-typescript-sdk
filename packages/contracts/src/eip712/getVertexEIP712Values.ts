import {
  SignableRequestType,
  SignableRequestTypeToParams,
} from './signableRequestType';
import {
  BurnLpParams,
  LinkSignerParams,
  LiquidateSubaccountParams,
  ListTriggerOrdersParams,
  MintLpParams,
  OrderCancellationParams,
  OrderParams,
  ProductOrdersCancellationParams,
  WithdrawCollateralParams,
} from './signatureParamTypes';
import { toX18 } from '@vertex-protocol/utils';
import { BigNumber } from 'ethers';
import { subaccountToHex } from '../utils';
import {
  EIP712BurnLpValues,
  EIP712LinkSignerValues,
  EIP712LiquidateSubaccountValues,
  EIP712ListTriggerOrdersValues,
  EIP712MintLpValues,
  EIP712OrderCancellationValues,
  EIP712OrderValues,
  EIP712ProductOrdersCancellationValues,
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
  let values: SignableRequestTypeToEIP712Values[keyof SignableRequestTypeToEIP712Values];
  switch (requestType) {
    case 'withdraw_collateral':
      values = getWithdrawCollateralValues(params as WithdrawCollateralParams);
      break;
    case 'mint_lp':
      values = getMintLpValues(params as MintLpParams);
      break;
    case 'burn_lp':
      values = getBurnLpValues(params as BurnLpParams);
      break;
    case 'place_order':
      values = getOrderValues(params as OrderParams);
      break;
    case 'list_trigger_orders':
      values = getListTriggerOrdersValues(params as ListTriggerOrdersParams);
      break;
    case 'cancel_orders':
      values = getOrderCancellationValues(params as OrderCancellationParams);
      break;
    case 'cancel_product_orders':
      values = getProductOrdersCancellationValues(
        params as ProductOrdersCancellationParams,
      );
      break;
    case 'liquidate_subaccount':
      values = getLiquidateSubaccountValues(
        params as LiquidateSubaccountParams,
      );
      break;
    case 'link_signer':
      values = getLinkSignerValues(params as LinkSignerParams);
      break;
    default:
      throw Error(`Unknown request type: ${requestType}`);
  }

  return values as SignableRequestTypeToEIP712Values[TReqType];
}

function getWithdrawCollateralValues(
  params: WithdrawCollateralParams,
): EIP712WithdrawCollateralValues {
  return {
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    }),
    productId: params.productId,
    amount: BigNumber.from(params.amount).toString(),
    nonce: BigNumber.from(params.nonce).toString(),
  };
}

function getMintLpValues(params: MintLpParams): EIP712MintLpValues {
  return {
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
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
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    }),
    productId: params.productId,
    amount: params.amount.toString(),
    nonce: BigNumber.from(params.nonce).toString(),
  };
}

function getOrderValues(params: OrderParams): EIP712OrderValues {
  return {
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    }),
    priceX18: toX18(params.price).toString(),
    amount: BigNumber.from(params.amount).toString(),
    expiration: BigNumber.from(params.expiration).toString(),
    nonce: BigNumber.from(params.nonce).toString(),
  };
}

function getListTriggerOrdersValues(
  params: ListTriggerOrdersParams,
): EIP712ListTriggerOrdersValues {
  return {
    recvTime: BigNumber.from(params.recvTime).toString(),
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    }),
  };
}

function getOrderCancellationValues(
  params: OrderCancellationParams,
): EIP712OrderCancellationValues {
  return {
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    }),
    productIds: params.productIds,
    digests: params.digests,
    nonce: BigNumber.from(params.nonce).toString(),
  };
}

function getProductOrdersCancellationValues(
  params: ProductOrdersCancellationParams,
): EIP712ProductOrdersCancellationValues {
  return {
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    }),
    productIds: params.productIds,
    nonce: BigNumber.from(params.nonce).toString(),
  };
}

function getLiquidateSubaccountValues(
  params: LiquidateSubaccountParams,
): EIP712LiquidateSubaccountValues {
  return {
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    }),
    liquidatee: subaccountToHex({
      subaccountOwner: params.liquidateeOwner,
      subaccountName: params.liquidateeName,
    }),
    mode: params.mode,
    healthGroup: params.healthGroup.toString(),
    amount: BigNumber.from(params.amount).toString(),
    nonce: BigNumber.from(params.nonce).toString(),
  };
}

function getLinkSignerValues(params: LinkSignerParams): EIP712LinkSignerValues {
  return {
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    }),
    signer: params.signer,
    nonce: BigNumber.from(params.nonce).toString(),
  };
}
