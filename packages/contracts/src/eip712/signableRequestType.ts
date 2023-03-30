import {
  BurnLpParams,
  LiquidateSubaccountParams,
  MintLpParams,
  OrderCancellationParams,
  OrderParams,
  ProductOrdersCancellationParams,
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
  cancel_orders: OrderCancellationParams;
  cancel_product_orders: ProductOrdersCancellationParams;
  liquidate_subaccount: LiquidateSubaccountParams;
}

export type SignableRequestType = keyof SignableRequestTypeToParams;
