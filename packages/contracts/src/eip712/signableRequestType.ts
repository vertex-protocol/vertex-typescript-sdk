import {
  DepositCollateralParams,
  LiquidateSubaccountParams,
  OrderParams,
  WithdrawCollateralParams,
} from './signatureParamTypes';

/**
 * All possible requests to be signed, to the expected params
 */
export interface SignableRequestTypeToParams {
  deposit_collateral: DepositCollateralParams;
  withdraw_collateral: WithdrawCollateralParams;
  place_order: OrderParams;
  cancel_order: OrderParams;
  liquidate_subaccount: LiquidateSubaccountParams;
}

export type SignableRequestType = keyof SignableRequestTypeToParams;
