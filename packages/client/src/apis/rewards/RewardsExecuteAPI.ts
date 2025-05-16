import { VertexAbis } from '@vertex-protocol/contracts';
import {
  toBigDecimal,
  toBigInt,
  toIntegerString,
} from '@vertex-protocol/utils';
import { Hex, WriteContractParameters } from 'viem';
import { BaseVertexAPI } from '../base';
import {
  CcipStakingParams,
  ClaimCcipLiquidTokensParams,
  ClaimLiquidTokensParams,
  VrtxTokenAmountParams,
} from './types';

export class RewardsExecuteAPI extends BaseVertexAPI {
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
   * Claim earned VRTX tokens on non-canonical chains
   */
  async claimSatelliteLiquidTokens(params: ClaimCcipLiquidTokensParams) {
    return this.context.contracts.vrtxStakingV2Satellite.write.claim(
      await this.getClaimLiquidTokensContractParams(params),
      { value: toBigInt(params.ccipFee) },
    );
  }

  /**
   * Claim trading rewards and stake the claimed VRTX on non-canonical chains
   */
  async claimAndStakeSatelliteLiquidTokens(
    params: ClaimCcipLiquidTokensParams,
  ) {
    return this.context.contracts.vrtxStakingV2Satellite.write.claimAndStake(
      await this.getClaimLiquidTokensContractParams(params),
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
  async withdrawUnstakedTokens() {
    return this.context.contracts.vrtxStaking.write.claimVrtx();
  }

  /**
   * Claim staking rewards (in USDC)
   */
  async claimStakingRewards() {
    return this.context.contracts.vrtxStaking.write.claimUsdc();
  }

  /**
   * Migrate VRTX tokens from the old staking contract to the new staking contract
   */
  async migrateStakingV2() {
    return this.context.contracts.vrtxStaking.write.migrateToV2();
  }

  /**
   * Unstake VRTX tokens, unstaked tokens that are unlocked will need to be withdrawn
   */
  async unstake(params: VrtxTokenAmountParams) {
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
  async stakeV2(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxStakingV2.write.stake([
      toBigInt(params.amount),
    ]);
  }

  /**
   * Unstake V2 VRTX tokens, unstake tokens instantly with a penalty that is redistributed
   */
  async unstakeV2() {
    return this.context.contracts.vrtxStakingV2.write.withdraw();
  }

  /**
   * Unstake V2 VRTX tokens, unstaked tokens that are unlocked will need to be claimed
   * after 21 day locking period
   */
  async unstakeV2Slow() {
    return this.context.contracts.vrtxStakingV2.write.withdrawSlow();
  }

  /**
   * Claim unlocked V2 tokens that were previously unstaked
   */
  async withdrawUnstakedV2Tokens() {
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
  async stakeV2Satellite(params: CcipStakingParams) {
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
  async unstakeV2Satellite(params: CcipStakingParams) {
    return this.context.contracts.vrtxStakingV2Satellite.write.withdraw({
      value: toBigInt(params.ccipFee),
    });
  }

  /**
   * Unstake V2 VRTX tokens on non-canonical chains, unstaked tokens that are unlocked will need to be claimed
   * after 21 day locking period
   */
  async unstakeV2SatelliteSlow(params: CcipStakingParams) {
    return this.context.contracts.vrtxStakingV2Satellite.write.withdrawSlow({
      value: toBigInt(params.ccipFee),
    });
  }

  /**
   * Claim unlocked V2 tokens that were previously unstaked on non-canonical chains
   */
  async withdrawUnstakedV2SatelliteTokens(params: CcipStakingParams) {
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

  /**
   * Util function to share logic between claimLiquidTokens and claimAndStakeLiquidTokens
   * @param params
   * @private
   */
  private async getClaimLiquidTokensContractParams(
    params: ClaimLiquidTokensParams | ClaimCcipLiquidTokensParams,
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
