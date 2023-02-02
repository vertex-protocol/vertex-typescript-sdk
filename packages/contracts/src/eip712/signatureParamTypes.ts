import { BigNumberish } from 'ethers';

export interface SignedTx<TBaseTx> {
  tx: TBaseTx;
  signature: string;
}

export interface SignedOrderParams {
  order: OrderParams;
  signature: string;
}

export interface WithdrawCollateralParams {
  // Address of sender
  sender: string;
  subaccountName: string;
  productId: number;
  amount: BigNumberish;
  nonce: number;
}

export interface MintLpParams {
  // Address of sender
  sender: string;
  subaccountName: string;
  productId: number;
  amountBase: BigNumberish;
  quoteAmountLow: BigNumberish;
  quoteAmountHigh: BigNumberish;
  nonce: number;
}

export interface BurnLpParams {
  // Address of sender
  sender: string;
  subaccountName: string;
  productId: number;
  amount: BigNumberish;
  nonce: number;
}

export interface LiquidateSubaccountParams {
  // Address of sender
  sender: string;
  subaccountName: string;
  // Subaccount being liquidated
  liquidateeOwner: string;
  liquidateeName: string;
  // 0 = spread, 1 = long, 2 = short
  mode: number;
  // Spot & perp pair
  healthGroup: BigNumberish;
  amount: BigNumberish;
  nonce: number;
}

export interface OrderParams {
  /**
   * IOC/FOK not currently supported
   * Number -> Expiration time in seconds
   */
  expiration: BigNumberish;
  // Sender address of the order
  sender: string;
  // Sender subaccount name
  subaccountName: string;
  // Limit price
  price: BigNumberish;
  // Positive for buy, negative for sell
  amount: BigNumberish;
  // A unique nonce to identify the order
  nonce: number;
}

export interface OrderCancellationParams {
  // Address of sender
  sender: string;
  subaccountName: string;
  productIds: number[];
  digests: string[];
  nonce: number;
}
