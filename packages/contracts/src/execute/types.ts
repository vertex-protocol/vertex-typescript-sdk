import { BigNumberish, Overrides } from 'ethers';
import { PromiseOrValue } from '../typechain-types/common';

export type ExecuteOverrides = Overrides & { from?: PromiseOrValue<string> };

export interface ApproveAllowanceParams {
  productId: BigNumberish;
  amount: BigNumberish;
}

export interface MintMockERC20Params {
  productId: BigNumberish;
  amount: BigNumberish;
}

export interface ModifyCollateralParams {
  subaccountName: string;
  operations: {
    productId: BigNumberish;
    // Positive to deposit, negative to withdraw
    amount: BigNumberish;
  }[];
}

/**
 * An abstraction type to be used to map to OffchainBook order structs
 */
export interface OrderbookRequest {
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

export interface LiquidateSubaccountParams {
  subaccountName: string;
  // Subaccount ID being liquidated
  liquidateeSubaccountId: BigNumberish;
  productId: BigNumberish;
  amount: BigNumberish;
}

export interface SettlePnlParams {
  subaccountIds: BigNumberish[];
}
