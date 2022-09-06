import { BigNumberish } from 'ethers';

export interface ApproveAllowanceParams {
  productId: BigNumberish;
  amount: BigNumberish;
}

export interface MintMockERC20Params {
  productId: BigNumberish;
  amount: BigNumberish;
}

export interface SettlePnlParams {
  subaccountIds: BigNumberish[];
}
