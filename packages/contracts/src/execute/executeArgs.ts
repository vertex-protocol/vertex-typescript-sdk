import { IClearinghouse } from '../typechain-types';
import { BigNumberish } from 'ethers';
import {
  ExecuteOverrides,
  LiquidateSubaccountParams,
  ModifyCollateralParams,
  SendOrdersParams,
} from './types';
import { mapOrderbookRequest } from './utils';

export function getModifyCollateralArgs(
  { subaccountName, operations }: ModifyCollateralParams,
  overrides?: ExecuteOverrides,
): Parameters<IClearinghouse['modifyCollateral']> {
  const productIds: BigNumberish[] = [];
  const amounts: BigNumberish[] = [];
  operations.forEach(({ productId, amount }) => {
    productIds.push(productId);
    amounts.push(amount);
  });
  return [subaccountName, productIds, amounts, overrides];
}

export function getSendOrdersArgs(
  { subaccountName, productId, requests }: SendOrdersParams,
  overrides?: ExecuteOverrides,
): Parameters<IClearinghouse['sendOrders']> {
  return [
    subaccountName,
    productId,
    requests.map(mapOrderbookRequest),
    overrides,
  ];
}

export function getLiquidateSubaccountArgs(
  {
    amount,
    liquidateeSubaccountId,
    productId,
    subaccountName,
  }: LiquidateSubaccountParams,
  overrides?: ExecuteOverrides,
): Parameters<IClearinghouse['liquidateSubaccount']> {
  return [subaccountName, liquidateeSubaccountId, productId, amount, overrides];
}
