import { BaseVertexAPI } from '../base';
import {
  ClaimLiquidTokensParams,
  ClaimTokensToLbaParams,
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
      await this.context.indexerClient.getTokenClaimProof({
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
   * Claim earned VRTX tokens
   *
   * @param params
   */
  async claimLiquidTokens(params: ClaimLiquidTokensParams) {
    const { totalAmount, proof } =
      await this.context.indexerClient.getTokenClaimProof({
        epoch: 6,
        address: await this.getChainSignerAddress(),
      });

    const airdropContract = this.context.contracts.vrtxAirdrop;

    // If no amount is given, then the full amount available is claimed
    const amountToClaim = await (async () => {
      if (params.amount) {
        return params.amount;
      }
      const amountsClaimed = await airdropContract.getClaimed(
        await this.getChainSignerAddress(),
      );
      const availableAmount = totalAmount.minus(
        amountsClaimed[params.epoch].toString(),
      );

      return availableAmount.toFixed();
    })();

    return this.context.contracts.vrtxAirdrop.claim(
      params.epoch,
      amountToClaim,
      totalAmount.toFixed(),
      proof,
    );
  }

  /**
   * Claim VRTX rewards associated with keeping liquidity in the LBA
   */
  async claimLbaRewards() {
    return this.context.contracts.vrtxLba.claimRewards();
  }

  /**
   * Stake VRTX tokens
   */
  async stake(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxStaking.stake(params.amount);
  }

  /**
   * Unstake VRTX tokens, unstaked tokens that are unlocked will need to be withdrawn
   */
  async unstake(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxStaking.withdraw(params.amount);
  }

  /**
   * Claim unlocked tokens that were previously unstaked
   */
  async withdrawUnstakedTokens() {
    return this.context.contracts.vrtxStaking.claimVrtx();
  }

  /**
   * Claim staking rewards (in USDC)
   */
  async claimStakingRewards() {
    return this.context.contracts.vrtxStaking.claimUsdc();
  }
}
