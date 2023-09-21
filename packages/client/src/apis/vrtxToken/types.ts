import { BigNumberish } from 'ethers';

export interface VrtxTokenAmountParams {
  amount: BigNumberish;
}

export type ClaimTokensToLbaParams = VrtxTokenAmountParams;

export interface ClaimLiquidTokensParams
  // If no amount is given, then the full amount is claimed
  extends Partial<VrtxTokenAmountParams> {
  epoch: number;
}
