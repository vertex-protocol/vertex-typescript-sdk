import { BigNumberish } from 'ethers';

export interface ApproveAllowanceParams {
  productId: number;
  amount: BigNumberish;
}

export interface GetTokenWalletBalanceParams {
  productId: number;
  address: string;
}

export interface GetTokenAllowanceParams {
  productId: number;
  address: string;
}
