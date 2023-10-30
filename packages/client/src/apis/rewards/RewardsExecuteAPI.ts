import { BaseVertexAPI } from '../base';
import {
  ClaimLiquidTokensParams,
  ClaimTokensToLbaParams,
  VrtxTokenAmountParams,
} from './types';
import { IArbAirdrop, LBA_AIRDROP_EPOCH } from '@vertex-protocol/contracts';

export class RewardsExecuteAPI extends BaseVertexAPI {
  /**
   * Claim VRTX tokens received during the airdrop phase to be deposited into the LBA pool
   *
   * @param params
   */
  async claimTokensToLba(params: ClaimTokensToLbaParams) {
    const { totalAmount, proof } = (
      await this.context.indexerClient.getClaimVrtxMerkleProofs({
        address: await this.getChainSignerAddress(),
      })
    )[LBA_AIRDROP_EPOCH];

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
  async depositLbaUsdc(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxLba.depositUsdc(params.amount);
  }

  /**
   * Withdraw USDC from the LBA pool
   *
   * @param params
   */
  async withdrawLbaUsdc(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxLba.withdrawUsdc(params.amount);
  }

  /**
   * Withdraw LP liquidity tokens from the LBA pool after the AMM has been created
   *
   * @param params
   */
  async withdrawLbaLiquidity(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxLba.withdrawLiquidity(params.amount);
  }

  /**
   * Claim earned VRTX tokens
   *
   * @param params
   */
  async claimLiquidTokens(params: ClaimLiquidTokensParams) {
    const { totalAmount, proof } = (
      await this.context.indexerClient.getClaimVrtxMerkleProofs({
        address: await this.getChainSignerAddress(),
      })
    )[params.epoch];

    const airdropContract = this.context.contracts.vrtxAirdrop;

    const amountToClaim = await (async () => {
      if ('amount' in params) {
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

  /**
   * Claims all available ARB rewards
   */
  async claimArbRewards() {
    const address = await this.getChainSignerAddress();

    // Get claimed to determine which weeks haven't yet been claimed
    const claimed = await this.context.contracts.arbAirdrop.getClaimed(address);
    const proofs = await this.context.indexerClient.getClaimArbMerkleProofs({
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
          totalAmount: item.totalAmount.toFixed(),
          week: idx,
        });
      }
    });

    return this.context.contracts.arbAirdrop.claim(proofsToClaim);
  }
}
