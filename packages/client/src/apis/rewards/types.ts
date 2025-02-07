import { BigDecimalish } from '@vertex-protocol/utils';

export interface VrtxTokenAmountParams {
  amount: BigDecimalish;
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
