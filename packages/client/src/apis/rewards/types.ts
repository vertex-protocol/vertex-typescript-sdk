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

export type ClaimDelegatedLiquidTokensParams = ClaimLiquidTokensParams & {
  /**
   * Address that originally received the rewards on another chain
   */
  originalRewardsAddress: string;
};

export interface DelegateRewardsParams {
  /**
   * Address to receive rewards on the primary rewards chain (ex. Arbitrum for VRTX)
   */
  receiverAddress: string;
  /**
   * Axelar General-Message-Passing fee, paid in native tokens of the originating chain. This will be sent as `value` for the transaction
   */
  gmpFee: BigNumberish;
}
