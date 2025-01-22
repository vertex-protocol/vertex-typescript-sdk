import { toX18 } from '@vertex-protocol/utils';
import { subaccountToHex } from '../utils';
import {
  EIP712BurnLpValues,
  EIP712IsolatedOrderValues,
  EIP712LeaderboardAuthenticationValues,
  EIP712LinkSignerValues,
  EIP712LiquidateSubaccountValues,
  EIP712ListTriggerOrdersValues,
  EIP712MintLpValues,
  EIP712OrderCancellationValues,
  EIP712OrderValues,
  EIP712ProductOrdersCancellationValues,
  EIP712TransferQuoteValues,
  EIP712WithdrawCollateralValues,
  SignableRequestTypeToEIP712Values,
} from './eip712ValueTypes';
import {
  SignableRequestType,
  SignableRequestTypeToParams,
} from './signableRequestType';
import {
  EIP712BurnLpParams,
  EIP712CancelOrdersParams,
  EIP712CancelProductOrdersParams,
  EIP712IsolatedOrderParams,
  EIP712LeaderboardAuthenticationParams,
  EIP712LinkSignerParams,
  EIP712LiquidateSubaccountParams,
  EIP712ListTriggerOrdersParams,
  EIP712MintLpParams,
  EIP712OrderParams,
  EIP712TransferQuoteParams,
  EIP712WithdrawCollateralParams,
} from './signatureParamTypes';

/**
 * Returns the EIP712 compatible values for signing.
 *
 * Note: We use the string representation of bigint to be compatible with JSON.stringify
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
      values = getWithdrawCollateralValues(
        params as EIP712WithdrawCollateralParams,
      );
      break;
    case 'mint_lp':
      values = getMintLpValues(params as EIP712MintLpParams);
      break;
    case 'burn_lp':
      values = getBurnLpValues(params as EIP712BurnLpParams);
      break;
    case 'place_order':
      values = getOrderValues(params as EIP712OrderParams);
      break;
    case 'place_isolated_order':
      values = getIsolatedOrderValues(params as EIP712IsolatedOrderParams);
      break;
    case 'list_trigger_orders':
      values = getListTriggerOrdersValues(
        params as EIP712ListTriggerOrdersParams,
      );
      break;
    case 'cancel_orders':
      values = getOrderCancellationValues(params as EIP712CancelOrdersParams);
      break;
    case 'cancel_product_orders':
      values = getProductOrdersCancellationValues(
        params as EIP712CancelProductOrdersParams,
      );
      break;
    case 'liquidate_subaccount':
      values = getLiquidateSubaccountValues(
        params as EIP712LiquidateSubaccountParams,
      );
      break;
    case 'link_signer':
      values = getLinkSignerValues(params as EIP712LinkSignerParams);
      break;
    case 'transfer_quote':
      values = getTransferQuoteValues(params as EIP712TransferQuoteParams);
      break;
    case 'leaderboard_authentication':
      values = getLeaderboardAuthenticationValues(
        params as EIP712LeaderboardAuthenticationParams,
      );
      break;
    default:
      throw Error(`Unknown request type: ${requestType}`);
  }

  return values as SignableRequestTypeToEIP712Values[TReqType];
}

function getWithdrawCollateralValues(
  params: EIP712WithdrawCollateralParams,
): EIP712WithdrawCollateralValues {
  return {
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    }),
    productId: params.productId,
    amount: params.amount,
    nonce: params.nonce,
  };
}

function getMintLpValues(params: EIP712MintLpParams): EIP712MintLpValues {
  return {
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    }),
    productId: params.productId,
    amountBase: params.amountBase,
    quoteAmountLow: params.quoteAmountLow,
    quoteAmountHigh: params.quoteAmountHigh,
    nonce: params.nonce,
  };
}

function getBurnLpValues(params: EIP712BurnLpParams): EIP712BurnLpValues {
  return {
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    }),
    productId: params.productId,
    amount: params.amount,
    nonce: params.nonce,
  };
}

function getOrderValues(params: EIP712OrderParams): EIP712OrderValues {
  return {
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    }),
    priceX18: toX18(params.price),
    amount: params.amount,
    expiration: params.expiration,
    nonce: params.nonce,
  };
}

function getIsolatedOrderValues(
  params: EIP712IsolatedOrderParams,
): EIP712IsolatedOrderValues {
  return {
    ...getOrderValues(params),
    margin: params.margin,
  };
}

function getListTriggerOrdersValues(
  params: EIP712ListTriggerOrdersParams,
): EIP712ListTriggerOrdersValues {
  return {
    recvTime: params.recvTime,
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    }),
  };
}

function getOrderCancellationValues(
  params: EIP712CancelOrdersParams,
): EIP712OrderCancellationValues {
  return {
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    }),
    productIds: params.productIds,
    digests: params.digests,
    nonce: BigInt(params.nonce).toString(),
  };
}

function getProductOrdersCancellationValues(
  params: EIP712CancelProductOrdersParams,
): EIP712ProductOrdersCancellationValues {
  return {
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    }),
    productIds: params.productIds,
    nonce: BigInt(params.nonce).toString(),
  };
}

function getLiquidateSubaccountValues(
  params: EIP712LiquidateSubaccountParams,
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
    healthGroup: params.healthGroup,
    amount: params.amount,
    nonce: BigInt(params.nonce).toString(),
  };
}

function getLinkSignerValues(
  params: EIP712LinkSignerParams,
): EIP712LinkSignerValues {
  return {
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    }),
    signer: params.signer,
    nonce: BigInt(params.nonce).toString(),
  };
}

function getTransferQuoteValues(
  params: EIP712TransferQuoteParams,
): EIP712TransferQuoteValues {
  return {
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    }),
    recipient: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.recipientSubaccountName,
    }),
    amount: params.amount,
    nonce: BigInt(params.nonce).toString(),
  };
}

function getLeaderboardAuthenticationValues(
  params: EIP712LeaderboardAuthenticationParams,
): EIP712LeaderboardAuthenticationValues {
  return {
    sender: subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    }),
    expiration: params.expiration,
  };
}
