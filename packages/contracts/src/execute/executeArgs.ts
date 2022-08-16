import { IClearinghouse } from '../typechain-types';
import { BigNumberish } from 'ethers';
import {
  ExecuteOverrides,
  LiquidateSubaccountParams,
  ModifyCollateralParams,
  SendOrdersParams,
  SettlePnlParams,
} from './types';
import { mapOrderbookRequest } from './utils';

/**
 * Returns args to pass to `modifyCollateral` of the `ethers` Clearinghouse contract
 *
 * @param params
 * @param overrides Ethers overrides
 */
export function getModifyCollateralArgs(
  params: ModifyCollateralParams,
  overrides?: ExecuteOverrides,
): Parameters<IClearinghouse['modifyCollateral']> {
  const { subaccountName, operations } = params;
  const productIds: BigNumberish[] = [];
  const amounts: BigNumberish[] = [];
  operations.forEach(({ productId, amount }) => {
    productIds.push(productId);
    amounts.push(amount);
  });
  return [subaccountName, productIds, amounts, overrides];
}

/**
 * Returns args to pass to `sendOrders` of the `ethers` Clearinghouse contract
 *
 * @param params
 * @param overrides Ethers overrides
 */
export function getSendOrdersArgs(
  params: SendOrdersParams,
  overrides?: ExecuteOverrides,
): Parameters<IClearinghouse['sendOrders']> {
  const { subaccountName, productId, requests } = params;
  return [
    subaccountName,
    productId,
    requests.map(mapOrderbookRequest),
    overrides,
  ];
}

/**
 * Returns args to pass to `liquidateSubaccount` of the `ethers` Clearinghouse contract
 *
 * @param params
 * @param overrides Ethers overrides
 */
export function getLiquidateSubaccountArgs(
  params: LiquidateSubaccountParams,
  overrides?: ExecuteOverrides,
): Parameters<IClearinghouse['liquidateSubaccount']> {
  const { amount, liquidateeSubaccountId, productId, subaccountName } = params;
  return [subaccountName, liquidateeSubaccountId, productId, amount, overrides];
}

/**
 * Returns args to pass to `settlePnl` of the `ethers` Clearinghouse contract
 *
 * @param params
 * @param overrides Ethers overrides
 */
export function getSettlePnlArgs(
  params: SettlePnlParams,
  overrides?: ExecuteOverrides,
): Parameters<IClearinghouse['settlePnl']> {
  return [params.subaccountIds, overrides];
}
