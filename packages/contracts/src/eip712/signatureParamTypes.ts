import { BigNumberish } from 'ethers';
import { Subaccount } from '../common';

export interface SignedTx<TBaseTx> {
  tx: TBaseTx;
  signature: string;
}

export interface SignedOrderParams {
  order: OrderParams;
  signature: string;
}

export interface WithdrawCollateralParams extends Subaccount {
  productId: number;
  amount: BigNumberish;
  nonce: string;
}

export interface MintLpParams extends Subaccount {
  productId: number;
  amountBase: BigNumberish;
  quoteAmountLow: BigNumberish;
  quoteAmountHigh: BigNumberish;
  nonce: string;
}

export interface BurnLpParams extends Subaccount {
  productId: number;
  amount: BigNumberish;
  nonce: string;
}

export interface LiquidateSubaccountParams extends Subaccount {
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

export interface OrderParams extends Subaccount {
  // Expiration time in seconds, with order type encoded if relevant
  expiration: BigNumberish;
  // Limit price
  price: BigNumberish;
  // Positive for buy, negative for sell
  amount: BigNumberish;
  // A unique nonce to identify the order
  nonce: string;
}

export interface ListTriggerOrdersParams extends Subaccount {
  recvTime: BigNumberish;
}

export interface OrderCancellationParams extends Subaccount {
  productIds: number[];
  digests: string[];
  nonce: string;
}

export interface ProductOrdersCancellationParams extends Subaccount {
  productIds: number[];
  nonce: string;
}

export interface LinkSignerParams extends Subaccount {
  signer: string;
  nonce: string;
}
