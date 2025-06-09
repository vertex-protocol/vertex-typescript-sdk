import { toBigInt } from '@vertex-protocol/utils';
import { Hex } from 'viem';
import { BaseRewardsAPI } from './BaseRewardsAPI';
import {
  SatelliteCcipParams,
  StakeSatelliteParams,
  VrtxTokenAmountParams,
} from './types';

export class RewardsExecuteAPI extends BaseRewardsAPI {
  /**
   *
   *  LBA/Airdrop
   *
   */

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
  async claimAllLiquidTokens() {
    const proofsToClaim = await this.getClaimAllLiquidTokensContractParams();

    return this.context.contracts.vrtxAirdrop.write.claimMultiple([
      proofsToClaim,
    ]);
  }

  /**
   * Claim earned VRTX tokens and stake them
   */
  async claimAndStakeAllLiquidTokens() {
    const proofsToClaim = await this.getClaimAllLiquidTokensContractParams();

    return this.context.contracts.vrtxAirdrop.write.claimMultipleAndStake([
      proofsToClaim,
    ]);
  }

  /**
   * Claim earned VRTX tokens on non-canonical chains
   */
  async claimAllLiquidTokensSatellite(params: SatelliteCcipParams) {
    const proofsToClaim = await this.getClaimAllLiquidTokensContractParams();

    return this.context.contracts.vrtxStakingV2Satellite.write.claimMultiple(
      [proofsToClaim],
      { value: toBigInt(params.ccipFee) },
    );
  }

  /**
   * Claim trading rewards and stake the claimed VRTX on non-canonical chains
   */
  async claimAndStakeAllLiquidTokensSatellite(params: SatelliteCcipParams) {
    const proofsToClaim = await this.getClaimAllLiquidTokensContractParams();

    return this.context.contracts.vrtxStakingV2Satellite.write.claimMultipleAndStake(
      [proofsToClaim],
      { value: toBigInt(params.ccipFee) },
    );
  }

  /**
   * Claim VRTX rewards associated with keeping liquidity in the LBA
   */
  async claimLbaRewards() {
    return this.context.contracts.vrtxLba.write.claimRewards();
  }

  /**
   *
   *  V1 Staking
   *
   */

  /**
   * Claim unlocked tokens that were previously unstaked
   */
  async withdrawUnstakedV1Tokens() {
    return this.context.contracts.vrtxStaking.write.claimVrtx();
  }

  /**
   * Claim staking rewards (in USDC)
   */
  async claimV1StakingRewards() {
    return this.context.contracts.vrtxStaking.write.claimUsdc();
  }

  /**
   * Migrate VRTX tokens from the old staking contract to the new staking contract
   */
  async migrateToStakingV2() {
    return this.context.contracts.vrtxStaking.write.migrateToV2();
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
   *
   *  V2 Staking
   *
   */

  /**
   * Stake V2 VRTX tokens
   */
  async stake(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxStakingV2.write.stake([
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
   * Claim unlocked V2 tokens that were previously unstaked
   */
  async withdrawUnstakedTokens() {
    return this.context.contracts.vrtxStakingV2.write.claimWithdraw();
  }

  /**
   *
   *  Staking Satellite
   *
   */

  /**
   * Stake V2 VRTX tokens on non-canonical chains
   */
  async stakeSatellite(params: StakeSatelliteParams) {
    const address = this.getWalletClientAddress();

    return this.context.contracts.vrtxStakingV2Satellite.write.stakeAs(
      [address, toBigInt(params.amount)],
      { value: toBigInt(params.ccipFee) },
    );
  }

  /**
   * Unstake V2 VRTX tokens on non-canonical chains, unstake tokens instantly with a penalty that is redistributed
   * to the staking contract
   */
  async unstakeSatellite(params: SatelliteCcipParams) {
    return this.context.contracts.vrtxStakingV2Satellite.write.withdraw({
      value: toBigInt(params.ccipFee),
    });
  }

  /**
   * Unstake V2 VRTX tokens on non-canonical chains, unstaked tokens that are unlocked will need to be claimed
   * after 21 day locking period
   */
  async unstakeSlowSatellite(params: SatelliteCcipParams) {
    return this.context.contracts.vrtxStakingV2Satellite.write.withdrawSlow({
      value: toBigInt(params.ccipFee),
    });
  }

  /**
   * Claim unlocked V2 tokens that were previously unstaked on non-canonical chains
   */
  async withdrawUnstakedTokensSatellite(params: SatelliteCcipParams) {
    return this.context.contracts.vrtxStakingV2Satellite.write.claimWithdraw({
      value: toBigInt(params.ccipFee),
    });
  }

  /**
   *
   *  Foundation Rewards
   *
   */

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
}
