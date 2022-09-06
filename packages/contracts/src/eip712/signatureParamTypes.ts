import { BigNumberish } from 'ethers';

export interface DepositCollateralParams {
  // Address of sender
  sender: string;
  subaccountName: string;
  productId: number;
  amount: BigNumberish;
  nonce: BigNumberish;
}

export type WithdrawCollateralParams = DepositCollateralParams;

export interface LiquidateSubaccountParams {
  // Address of sender
  sender: string;
  subaccountName: string;
  // Subaccount ID being liquidated
  liquidateeSubaccountId: BigNumberish;
  productId: BigNumberish;
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
  // Subaccount ID to use for this order, the resulting signed order must be signed by the owner of the subaccount
  subaccountId: BigNumberish;
  // Limit price
  price: BigNumberish;
  // Positive for buy, negative for sell
  amount: BigNumberish;
  // A unique nonce to identify the order
  nonce: BigNumberish;
}
