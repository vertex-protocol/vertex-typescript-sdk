import { BigNumberish } from 'ethers';

export interface MintMockERC20Params {
  productId: BigNumberish;
  amount: BigNumberish;
}

export interface SettlePnlParams {
  subaccountIds: BigNumberish[];
}
