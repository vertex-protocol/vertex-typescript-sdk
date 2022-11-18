import {
  BurnLpParams,
  LiquidateSubaccountParams,
  MintLpParams,
  OrderParams,
  WithdrawCollateralParams,
} from './signatureParamTypes';

/**
 * All possible requests to be signed, to the expected params
 */
export interface SignableRequestTypeToParams {
  withdraw_collateral: WithdrawCollateralParams;
  mint_lp: MintLpParams;
  burn_lp: BurnLpParams;
  place_order: OrderParams;
  cancel_order: OrderParams;
  liquidate_subaccount: LiquidateSubaccountParams;
}

export type SignableRequestType = keyof SignableRequestTypeToParams;
