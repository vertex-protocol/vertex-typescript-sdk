import {
  DepositCollateralParams,
  LiquidateSubaccountParams,
  OrderParams,
  WithdrawCollateralParams,
} from './signatureParamTypes';

export interface SignableRequestTypeToParams {
  depositCollateral: DepositCollateralParams;
  withdrawCollateral: WithdrawCollateralParams;
  placeOrder: OrderParams;
  cancelOrder: OrderParams;
  liquidateSubaccount: LiquidateSubaccountParams;
}

export type SignableRequestType = keyof SignableRequestTypeToParams;
