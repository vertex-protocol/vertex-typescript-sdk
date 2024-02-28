import { BigNumberish } from 'ethers';

export interface VrtxTokenAmountParams {
  amount: BigNumberish;
}

export type ExecuteClaimTokensToLbaParams = VrtxTokenAmountParams;

// Either specify the amount, or attempt to claim all available tokens
type AmountOrAllParams =
  | VrtxTokenAmountParams
  | {
      claimAll: true;
    };

export type ExecuteClaimLiquidTokensParams = {
  epoch: number;
} & AmountOrAllParams;
