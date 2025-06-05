import { BigDecimalish } from '@vertex-protocol/utils';
import { Hex } from 'viem';

export interface VrtxTokenAmountParams {
  amount: BigDecimalish;
}

export interface SatelliteCcipParams {
  ccipFee: BigDecimalish;
}

export type StakeSatelliteParams = VrtxTokenAmountParams & SatelliteCcipParams;

export interface RewardsLiquidTokensProof {
  epoch: number;
  amount: bigint;
  totalAmount: bigint;
  proof: Hex[];
}

export type ClaimLiquidTokensParams = RewardsLiquidTokensProof[];

export type ClaimLiquidTokensSatelliteParams = ClaimLiquidTokensParams &
  SatelliteCcipParams;

export enum SatelliteTransactionType {
  STAKE_AS = 0,
  WITHDRAW = 1,
  WITHDRAW_SLOW = 2,
  CLAIM_WITHDRAW = 3,
  CLAIM_MULTIPLE = 4,
  CLAIM = 5,
  CLAIM_MULTIPLE_AND_STAKE = 6,
  CLAIM_AND_STAKE = 7,
}
