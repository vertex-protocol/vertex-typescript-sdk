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
  nonce: BigNumberish;
}

export interface LiquidateSubaccountParams {
  // Address of sender
  sender: string;
  subaccountName: string;
  // Subaccount ID being liquidated
  liquidateeId: BigNumberish;
  productId: number;
  amount: BigNumberish;
  nonce: BigNumberish;
}

// Used for placement and cancellations
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
  nonce: BigNumberish;
}
