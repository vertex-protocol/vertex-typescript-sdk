import { Subaccount } from '../common';

export interface SignedTx<TBaseTx> {
  tx: TBaseTx;
  signature: string;
}

export interface SignedEIP712OrderParams {
  order: EIP712OrderParams;
  signature: string;
}

export interface EIP712WithdrawCollateralParams extends Subaccount {
  productId: number;
  amount: string;
  nonce: string;
}

export interface EIP712MintLpParams extends Subaccount {
  productId: number;
  amountBase: string;
  quoteAmountLow: string;
  quoteAmountHigh: string;
  nonce: string;
}

export interface EIP712BurnLpParams extends Subaccount {
  productId: number;
  amount: string;
  nonce: string;
}

export interface EIP712LiquidateSubaccountParams extends Subaccount {
  // Subaccount being liquidated
  liquidateeOwner: string;
  liquidateeName: string;
  // 0 = spread, 1 = long, 2 = short
  mode: number;
  // Spot & perp pair
  healthGroup: string;
  amount: string;
  nonce: string;
}

export interface EIP712OrderParams extends Subaccount {
  // Expiration time in seconds, with order type encoded if relevant
  expiration: string;
  // Limit price
  price: string;
  // Positive for buy, negative for sell
  amount: string;
  // A unique nonce to identify the order
  nonce: string;
}

export interface EIP712IsolatedOrderParams extends EIP712OrderParams {
  // Amount of quote margin to transfer when the order fills
  margin: string;
}

export interface EIP712ListTriggerOrdersParams extends Subaccount {
  recvTime: string;
}

export interface EIP712CancelOrdersParams extends Subaccount {
  productIds: number[];
  digests: string[];
  nonce: string;
}

export interface EIP712CancelProductOrdersParams extends Subaccount {
  productIds: number[];
  nonce: string;
}

export interface EIP712LinkSignerParams extends Subaccount {
  signer: string;
  nonce: string;
}

export interface EIP712TransferQuoteParams extends Subaccount {
  recipientSubaccountName: string;
  amount: string;
  nonce: string;
}

export interface EIP712LeaderboardAuthenticationParams extends Subaccount {
  expiration: string;
}
