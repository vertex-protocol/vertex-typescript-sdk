import { BigNumberish } from 'ethers';

export interface VrtxTokenAmountParams {
  amount: BigNumberish;
}

export type ClaimTokensToLbaParams = VrtxTokenAmountParams;

export interface ClaimLiquidTokensParams extends VrtxTokenAmountParams {
  epoch: number;
}
