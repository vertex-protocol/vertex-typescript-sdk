import { BigNumberish } from 'ethers';

export interface DepositParams {
  productId: number;
  subaccountName: string;
  amount: BigNumberish;
}

export interface ApproveAllowanceParams {
  productId: number;
  amount: BigNumberish;
}
