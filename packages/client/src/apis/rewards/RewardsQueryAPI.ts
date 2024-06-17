import { BaseVertexAPI } from '../base';

export class RewardsQueryAPI extends BaseVertexAPI {
  /**
   * Estimates the output amount of the USDC -> VRTX swap when executing claim + stake
   * @param address
   */
  getStakingRewardsEstimatedVrtxSwapAmount({ address }: { address: string }) {
    return this.context.contracts.vrtxStaking.getEstimatedVrtxToStake.staticCall(
      address,
    );
  }

  /**
   * Returns the rewards delegate for the given address. This must be called on the VRTX rewards chain (Arbitrum)
   *
   * @example if wallet B on another chain delegates rewards to wallet A on Arbitrum, `getRewardsDelegate(walletB)` will return walletA
   * @param address
   */
  getRewardsDelegate({ address }: { address: string }) {
    return this.context.contracts.vrtxAirdrop.delegates(address);
  }
}
