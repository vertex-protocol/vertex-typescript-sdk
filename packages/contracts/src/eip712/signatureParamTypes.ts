import { BigNumberish } from 'ethers';
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
  amount: BigNumberish;
  nonce: string;
}

export interface EIP712MintLpParams extends Subaccount {
  productId: number;
  amountBase: BigNumberish;
  quoteAmountLow: BigNumberish;
  quoteAmountHigh: BigNumberish;
  nonce: string;
}

export interface EIP712BurnLpParams extends Subaccount {
  productId: number;
  amount: BigNumberish;
  nonce: string;
}

export interface EIP712LiquidateSubaccountParams extends Subaccount {
  // Subaccount being liquidated
  liquidateeOwner: string;
  liquidateeName: string;
  // 0 = spread, 1 = long, 2 = short
  mode: number;
  // Spot & perp pair
  healthGroup: BigNumberish;
  amount: BigNumberish;
  nonce: string;
}

export interface EIP712OrderParams extends Subaccount {
  // Expiration time in seconds, with order type encoded if relevant
  expiration: BigNumberish;
  // Limit price
  price: BigNumberish;
  // Positive for buy, negative for sell
  amount: BigNumberish;
  // A unique nonce to identify the order
  nonce: string;
}

export interface EIP712ListTriggerOrdersParams extends Subaccount {
  recvTime: BigNumberish;
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
  recipient: string;
  amount: BigNumberish;
  nonce: string;
}
