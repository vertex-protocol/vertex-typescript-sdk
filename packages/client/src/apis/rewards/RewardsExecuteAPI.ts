import { VertexAbis } from '@vertex-protocol/contracts';
import {
  toBigDecimal,
  toBigInt,
  toIntegerString,
} from '@vertex-protocol/utils';
import { Hex, WriteContractParameters } from 'viem';
import { BaseVertexAPI } from '../base';
import { ClaimLiquidTokensParams, VrtxTokenAmountParams } from './types';

export class RewardsExecuteAPI extends BaseVertexAPI {
  /**
   * Withdraw LP liquidity tokens from the LBA pool after the AMM has been created
   */
  async withdrawLbaLiquidity(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxLba.write.withdrawLiquidity([
      toBigInt(params.amount),
    ]);
  }

  /**
   * Claim earned VRTX tokens
   */
  async claimLiquidTokens(params: ClaimLiquidTokensParams) {
    return this.context.contracts.vrtxAirdrop.write.claim(
      await this.getClaimLiquidTokensContractParams(params),
    );
  }

  /**
   * Claim earned VRTX tokens and stake them
   */
  async claimAndStakeLiquidTokens(params: ClaimLiquidTokensParams) {
    return this.context.contracts.vrtxAirdrop.write.claimAndStake(
      await this.getClaimLiquidTokensContractParams(params),
    );
  }

  /**
   * Claim VRTX rewards associated with keeping liquidity in the LBA
   */
  async claimLbaRewards() {
    return this.context.contracts.vrtxLba.write.claimRewards();
  }

  /**
   * Migrate VRTX tokens from the old staking contract to the new staking contract
   */
  async migrateToStakingV2() {
    return this.context.contracts.vrtxStaking.write.migrateToV2();
  }

  /**
   * Stake VRTX tokens
   */
  async stakeV1(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxStaking.write.stake([
      toBigInt(params.amount),
    ]);
  }

  /**
   * Stake V2 VRTX tokens
   */
  async stake(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxStakingV2.write.stake([
      toBigInt(params.amount),
    ]);
  }

  /**
   * Unstake VRTX tokens, unstaked tokens that are unlocked will need to be withdrawn
   */
  async unstakeV1(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxStaking.write.withdraw([
      toBigInt(params.amount),
    ]);
  }

  /**
   * Unstake V2 VRTX tokens, unstake tokens instantly with a penalty that is redistributed
   */
  async unstake() {
    return this.context.contracts.vrtxStakingV2.write.withdraw();
  }

  /**
   * Unstake V2 VRTX tokens, unstaked tokens that are unlocked will need to be claimed
   * after 21 day locking period
   */
  async unstakeSlow() {
    return this.context.contracts.vrtxStakingV2.write.withdrawSlow();
  }

  /**
   * Claim unlocked tokens that were previously unstaked
   */
  async withdrawUnstakedV1Tokens() {
    return this.context.contracts.vrtxStaking.write.claimVrtx();
  }

  /**
   * Claim unlocked V2 tokens that were previously unstaked
   */
  async withdrawUnstakedTokens() {
    return this.context.contracts.vrtxStakingV2.write.claimWithdraw();
  }

  /**
   * Claim staking rewards (in USDC)
   */
  async claimV1StakingRewards() {
    return this.context.contracts.vrtxStaking.write.claimUsdc();
  }

  /**
   * Claim staking rewards (in USDC), swap for VRTX, and stake the VRTX
   */
  async claimAndStakeV1StakingRewards() {
    return this.context.contracts.vrtxStaking.write.claimUsdcAndStake();
  }

  /**
   * Claims all available foundation rewards. Foundation rewards are tokens associated with the chain. For example, ARB on Arbitrum.
   * Typically, foundations for these chains will issue rewards for us to give to users.
   */
  async claimFoundationRewards() {
    const address = this.getWalletClientAddress();

    // Get claimed to determine which weeks haven't yet been claimed
    const claimed =
      await this.context.contracts.foundationRewardsAirdrop.read.getClaimed([
        address,
      ]);
    const proofs =
      await this.context.indexerClient.getClaimFoundationRewardsMerkleProofs({
        address,
      });

    // Get proofs for all weeks that haven't yet been claimed
    const proofsToClaim: {
      week: number;
      totalAmount: bigint;
      proof: Hex[];
    }[] = [];
    proofs.forEach((item, idx) => {
      if (idx === 0) {
        // week 0 is invalid
        return;
      }

      // There's no partial claim, so find weeks where there's a claimable amount and amt claimed is zero
      if (item.totalAmount.gt(0) && claimed[idx] === 0n) {
        proofsToClaim.push({
          proof: item.proof,
          totalAmount: toBigInt(item.totalAmount),
          week: idx,
        });
      }
    });

    return this.context.contracts.foundationRewardsAirdrop.write.claim([
      proofsToClaim,
    ]);
  }

  /**
   * Util function to share logic between claimLiquidTokens and claimAndStakeLiquidTokens
   * @param params
   */
  private async getClaimLiquidTokensContractParams(
    params: ClaimLiquidTokensParams,
  ): Promise<
    WriteContractParameters<VertexAbis['vrtxAirdrop'], 'claimAndStake'>['args']
  > {
    const address = this.getWalletClientAddress();

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
      const amountsClaimed = await airdropContract.read.getClaimed([address]);

      const availableAmount = totalAmount.minus(
        // Some wallets seem to throw a `RangeError` here if we do amountsClaimed[params.epoch]
        // Likely because `amountsClaimed` isn't a simple array but a proxy
        toBigDecimal(amountsClaimed.at(params.epoch) ?? 0),
      );

      return toIntegerString(availableAmount);
    })();

    return [
      params.epoch,
      toBigInt(amountToClaim),
      toBigInt(totalAmount),
      proof,
    ];
  }
}
