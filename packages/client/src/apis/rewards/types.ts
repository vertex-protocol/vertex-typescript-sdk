import { BigDecimalish } from '@vertex-protocol/utils';

export interface VrtxTokenAmountParams {
  amount: BigDecimalish;
}

export interface CcipStakingParams extends VrtxTokenAmountParams {
  ccipFee: BigDecimalish;
}

// Either specify the amount, or attempt to claim all available tokens
type AmountOrAllParams =
  | VrtxTokenAmountParams
  | {
      claimAll: true;
    };

export type ClaimLiquidTokensParams = AmountOrAllParams & {
  epoch: number;
};

export type ClaimCcipLiquidTokensParams = ClaimLiquidTokensParams & {
  ccipFee: BigDecimalish;
};
