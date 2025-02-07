import {
  IAirdrop,
  IArbAirdrop,
  LBA_AIRDROP_EPOCH,
} from '@vertex-protocol/contracts';
import { BaseVertexAPI } from '../base';
import {
  ClaimLiquidTokensParams,
  ClaimTokensToLbaParams,
  VrtxTokenAmountParams,
} from './types';
import { toBigDecimal } from '@vertex-protocol/utils';

export class RewardsExecuteAPI extends BaseVertexAPI {
  /**
   * Claim VRTX tokens received during the airdrop phase to be deposited into the LBA pool
   */
  async claimTokensToLba(params: ClaimTokensToLbaParams) {
    const { totalAmount, proof } = (
      await this.context.indexerClient.getClaimVrtxMerkleProofs({
        address: await this.getChainSignerAddress(),
      })
    )[LBA_AIRDROP_EPOCH];

    return this.context.contracts.vrtxAirdrop.claimToLBA(
      toBigDecimal(params.amount).toFixed(0),
      toBigDecimal(totalAmount).toFixed(0),
      proof,
    );
  }

  /**
   * Deposit USDC into the LBA pool
   */
  async depositLbaUsdc(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxLba.depositUsdc(
      toBigDecimal(params.amount).toFixed(0),
    );
  }

  /**
   * Withdraw USDC from the LBA pool
   */
  async withdrawLbaUsdc(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxLba.withdrawUsdc(
      toBigDecimal(params.amount).toFixed(0),
    );
  }

  /**
   * Withdraw LP liquidity tokens from the LBA pool after the AMM has been created
   */
  async withdrawLbaLiquidity(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxLba.withdrawLiquidity(
      toBigDecimal(params.amount).toFixed(0),
    );
  }

  /**
   * Claim earned VRTX tokens
   */
  async claimLiquidTokens(params: ClaimLiquidTokensParams) {
    return this.context.contracts.vrtxAirdrop.claim(
      ...(await this.getClaimLiquidTokensContractParams(params)),
    );
  }

  /**
   * Claim earned VRTX tokens and stake them
   */
  async claimAndStakeLiquidTokens(params: ClaimLiquidTokensParams) {
    return this.context.contracts.vrtxAirdrop.claimAndStake(
      ...(await this.getClaimLiquidTokensContractParams(params)),
    );
  }

  /**
   * Claim VRTX rewards associated with keeping liquidity in the LBA
   */
  async claimLbaRewards() {
    return this.context.contracts.vrtxLba.claimRewards();
  }

  /**
   * Migrate VRTX tokens from the old staking contract to the new staking contract
   */
  async migrateStakingV2() {
    return this.context.contracts.vrtxStaking.migrateToV2();
  }

  /**
   * Stake VRTX tokens
   */
  async stake(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxStaking.stake(
      toBigDecimal(params.amount).toFixed(0),
    );
  }

  /**
   * Stake V2 VRTX tokens
   */
  async stakeV2(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxStakingV2.stake(
      toBigDecimal(params.amount).toFixed(0),
    );
  }

  /**
   * Unstake VRTX tokens, unstaked tokens that are unlocked will need to be withdrawn
   */
  async unstake(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxStaking.withdraw(
      toBigDecimal(params.amount).toFixed(0),
    );
  }

  /**
   * Unstake V2 VRTX tokens, unstake tokens instantly with a penalty that is redistributed
   */
  async unstakeV2() {
    return this.context.contracts.vrtxStakingV2.withdraw();
  }

  /**
   * Unstake V2 VRTX tokens, unstaked tokens that are unlocked will need to be claimed
   * after 21 day locking period
   */
  async unstakeV2Slow() {
    return this.context.contracts.vrtxStakingV2.withdrawSlow();
  }

  /**
   * Claim unlocked tokens that were previously unstaked
   */
  async withdrawUnstakedTokens() {
    return this.context.contracts.vrtxStaking.claimVrtx();
  }

  /**
   * Claim unlocked V2 tokens that were previously unstaked
   */
  async withdrawUnstakedV2Tokens() {
    return this.context.contracts.vrtxStakingV2.claimWithdraw();
  }

  /**
   * Claim staking rewards (in USDC)
   */
  async claimStakingRewards() {
    return this.context.contracts.vrtxStaking.claimUsdc();
  }

  /**
   * Claim staking rewards (in USDC), swap for VRTX, and stake the VRTX
   */
  async claimAndStakeStakingRewards() {
    return this.context.contracts.vrtxStaking.claimUsdcAndStake();
  }

  /**
   * Claims all available foundation rewards. Foundation rewards are tokens associated with the chain. For example, ARB on Arbitrum.
   * Typically, foundations for these chains will issue rewards for us to give to users.
   */
  async claimFoundationRewards() {
    const address = await this.getChainSignerAddress();

    // Get claimed to determine which weeks haven't yet been claimed
    const claimed =
      await this.context.contracts.foundationRewardsAirdrop.getClaimed(address);
    const proofs =
      await this.context.indexerClient.getClaimFoundationRewardsMerkleProofs({
        address,
      });

    // Get proofs for all weeks that haven't yet been claimed
    const proofsToClaim: IArbAirdrop.ClaimProofStruct[] = [];
    proofs.forEach((item, idx) => {
      if (idx === 0) {
        // week 0 is invalid
        return;
      }

      // There's no partial claim, so find weeks where there's a claimable amount and amt claimed is zero
      if (item.totalAmount.gt(0) && claimed[idx] === 0n) {
        proofsToClaim.push({
          proof: item.proof,
          totalAmount: toBigDecimal(item.totalAmount).toFixed(0),
          week: toBigDecimal(idx).toFixed(0),
        });
      }
    });

    return this.context.contracts.foundationRewardsAirdrop.claim(proofsToClaim);
  }

  /**
   * Util function to share logic between claimLiquidTokens and claimAndStakeLiquidTokens
   * @param params
   * @private
   */
  private async getClaimLiquidTokensContractParams(
    params: ClaimLiquidTokensParams,
  ): Promise<Parameters<IAirdrop['claimAndStake']>> {
    const address = await this.getChainSignerAddress();

    const { totalAmount, proof } = (
      await this.context.indexerClient.getClaimVrtxMerkleProofs({
        address,
      })
    )[params.epoch];

    const airdropContract = this.context.contracts.vrtxAirdrop;

    const amountToClaim = await (async () => {
      if ('amount' in params) {
        return params.amount;
      }
      const amountsClaimed = await airdropContract.getClaimed(address);

      const availableAmount = totalAmount.minus(
        // Some wallets seem to throw a `RangeError` here if we do amountsClaimed[params.epoch]
        // Likely because `amountsClaimed` isn't a simple array but a proxy
        amountsClaimed.at(params.epoch)?.toString() ?? 0,
      );

      return availableAmount.toFixed(0);
    })();

    return [
      toBigDecimal(params.epoch).toFixed(),
      toBigDecimal(amountToClaim).toFixed(0),
      totalAmount.toFixed(0),
      proof,
    ];
  }
}
