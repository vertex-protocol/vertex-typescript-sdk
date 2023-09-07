import { BaseVertexAPI } from '../base';
import {
  ClaimLiquidTokensParams,
  ClaimTokensToLbaParams,
  VestLiquidTokensParams,
  VrtxTokenAmountParams,
} from './types';
import { LBA_AIRDROP_EPOCH } from '@vertex-protocol/contracts';

export class VrtxTokenExecuteAPI extends BaseVertexAPI {
  /**
   * Claim VRTX tokens received during the airdrop phase to be deposited into the LBA pool
   *
   * @param params
   */
  async claimTokensToLba(params: ClaimTokensToLbaParams) {
    const { totalAmount, proof } =
      await this.context.engineClient.getTokenClaimProof({
        epoch: LBA_AIRDROP_EPOCH,
        address: await this.getChainSignerAddress(),
      });

    return this.context.contracts.vrtxAirdrop.claimToLBA(
      params.amount,
      totalAmount.toFixed(),
      proof,
    );
  }

  /**
   * Claim all available vested tokens
   */
  claimVestedTokens() {
    return this.context.contracts.vrtxVesting.claim();
  }

  /**
   * Deposit USDC into the LBA pool
   *
   * @param params
   */
  depositLbaUsdc(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxLba.depositUsdc(params.amount);
  }

  /**
   * Withdraw USDC from the LBA pool
   *
   * @param params
   */
  withdrawLbaUsdc(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxLba.withdrawUsdc(params.amount);
  }

  /**
   * Withdraw LP liquidity tokens from the LBA pool after the AMM has been created
   *
   * @param params
   */
  withdrawLbaLiquidity(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxLba.withdrawLiquidity(params.amount);
  }

  /**
   * Submits earned VRTX tokens to be vested
   *
   * @param params
   */
  async vestLiquidTokens(params: VestLiquidTokensParams) {
    const { totalAmount, proof } =
      await this.context.engineClient.getTokenClaimProof({
        epoch: params.epoch,
        address: await this.getChainSignerAddress(),
      });

    return this.context.contracts.vrtxAirdrop.vest(
      params.epoch,
      params.amount,
      totalAmount.toFixed(),
      proof,
    );
  }

  /**
   * Claim earned VRTX tokens directly without vesting, resulting in a 50% burn
   *
   * @param params
   */
  async claimLiquidTokens(params: ClaimLiquidTokensParams) {
    const { totalAmount, proof } =
      await this.context.engineClient.getTokenClaimProof({
        epoch: 6,
        address: await this.getChainSignerAddress(),
      });

    return this.context.contracts.vrtxAirdrop.claim(
      params.epoch,
      params.amount,
      totalAmount.toFixed(),
      proof,
    );
  }

  /**
   * Claim VRTX rewards associated with keeping liquidity in the LBA
   */
  async claimLbaRewards() {
    return this.context.contracts.vrtxLba.claimRewards(
      await this.getChainSignerAddress(),
    );
  }
}
