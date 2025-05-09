import { BigDecimalish } from '@vertex-protocol/utils';

export interface VrtxTokenAmountParams {
  amount: BigDecimalish;
}

export interface SatelliteCcipParams {
  ccipFee: BigDecimalish;
}

export type StakeSatelliteParams = VrtxTokenAmountParams & SatelliteCcipParams;

// Either specify the amount, or attempt to claim all available tokens
type AmountOrAllParams =
  | VrtxTokenAmountParams
  | {
      claimAll: true;
    };

export type ClaimLiquidTokensParams = AmountOrAllParams & {
  epoch: number;
};

export type ClaimLiquidTokensSatelliteParams = ClaimLiquidTokensParams &
  SatelliteCcipParams;

export enum SatelliteTransactionType {
  STAKE_AS = 0,
  WITHDRAW = 1,
  WITHDRAW_SLOW = 2,
  CLAIM_WITHDRAW = 3,
  CLAIM = 4,
  CLAIM_AND_STAKE = 5,
}
