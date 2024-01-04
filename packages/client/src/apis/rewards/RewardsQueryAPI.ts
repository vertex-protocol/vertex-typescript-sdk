import { BaseVertexAPI } from '../base';

export class RewardsQueryAPI extends BaseVertexAPI {
  /**
   * Estimates the output amount of the USDC -> VRTX swap when executing claim + stake
   * @param address
   */
  async getStakingRewardsEstimatedVrtxSwapAmount({
    address,
  }: {
    address: string;
  }) {
    return this.context.contracts.vrtxStaking.getEstimatedVrtxToStake.staticCall(
      address,
    );
  }
}
