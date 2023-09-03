import { BigNumberish } from 'ethers';

export interface VrtxTokenAmountParams {
  amount: BigNumberish;
}

export type ClaimTokensToLbaParams = VrtxTokenAmountParams;

export interface VestLiquidTokensParams extends VrtxTokenAmountParams {
  epoch: number;
}

export type ClaimLiquidTokensParams = VestLiquidTokensParams;
