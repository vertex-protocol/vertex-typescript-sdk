import {
  EIP712BurnLpParams,
  EIP712LinkSignerParams,
  EIP712LiquidateSubaccountParams,
  EIP712ListTriggerOrdersParams,
  EIP712MintLpParams,
  EIP712CancelOrdersParams,
  EIP712OrderParams,
  EIP712CancelProductOrdersParams,
  EIP712WithdrawCollateralParams,
  EIP712TransferQuoteParams,
  EIP712LeaderboardAuthenticationParams,
} from './signatureParamTypes';

/**
 * All possible requests to be signed, to the expected params
 */
export interface SignableRequestTypeToParams {
  withdraw_collateral: EIP712WithdrawCollateralParams;
  mint_lp: EIP712MintLpParams;
  burn_lp: EIP712BurnLpParams;
  place_order: EIP712OrderParams;
  list_trigger_orders: EIP712ListTriggerOrdersParams;
  cancel_orders: EIP712CancelOrdersParams;
  cancel_product_orders: EIP712CancelProductOrdersParams;
  liquidate_subaccount: EIP712LiquidateSubaccountParams;
  link_signer: EIP712LinkSignerParams;
  transfer_quote: EIP712TransferQuoteParams;
  leaderboard_authentication: EIP712LeaderboardAuthenticationParams;
}

export type SignableRequestType = keyof SignableRequestTypeToParams;
