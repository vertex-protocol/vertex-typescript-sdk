import { BigNumberish } from 'ethers';

export interface VrtxTokenAmountParams {
  amount: BigNumberish;
}

export type ClaimTokensToLbaParams = VrtxTokenAmountParams;

// Either specify the amount, or attempt to claim all available tokens
type AmountOrAllParams =
  | VrtxTokenAmountParams
  | {
      claimAll: true;
    };

export type ClaimLiquidTokensParams = {
  epoch: number;
} & AmountOrAllParams;
