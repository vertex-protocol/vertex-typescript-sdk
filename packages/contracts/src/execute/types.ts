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
