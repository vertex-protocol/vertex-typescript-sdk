import { BigNumberish, Bytes } from 'ethers';

export interface MintMockERC20Params {
  productId: BigNumberish;
  amount: BigNumberish;
}

export interface SettlePnlParams {
  subaccounts: Bytes[];
  productIds: number[];
}
