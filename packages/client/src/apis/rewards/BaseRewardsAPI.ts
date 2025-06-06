import {
  toBigDecimal,
  toBigInt,
  toIntegerString,
} from '@vertex-protocol/utils';
import { BaseVertexAPI } from '../base';
import { RewardsLiquidTokensProof } from './types';

export class BaseRewardsAPI extends BaseVertexAPI {
  /**
   * Util function to share logic between claimLiquidTokens and claimAndStakeLiquidTokens
   * @param epoch - Optional epoch to claim, if not provided, all epochs will be claimed
   */
  async getRewardsLiquidTokensProofs(
    epochs?: number[],
  ): Promise<RewardsLiquidTokensProof[]> {
    const address = this.getWalletClientAddress();

    const proofs = await this.context.indexerClient.getClaimVrtxMerkleProofs({
      address,
    });

    const amountsClaimed =
      await this.context.contracts.vrtxAirdrop.read.getClaimed([address]);

    const proofsToClaim: RewardsLiquidTokensProof[] = [];

    proofs.forEach(({ proof, totalAmount }, idx) => {
      if (idx === 0) {
        // week 0 is invalid
        return;
      }

      const amountToClaim = totalAmount.minus(
        // Some wallets seem to throw a `RangeError` here if we do amountsClaimed[params.epoch]
        // Likely because `amountsClaimed` isn't a simple array but a proxy
        toBigDecimal(amountsClaimed.at(idx) ?? 0),
      );

      if (amountToClaim.isZero() || (epochs && !epochs.includes(idx))) {
        return;
      }

      proofsToClaim.push({
        epoch: idx,
        amount: toBigInt(toIntegerString(amountToClaim)),
        totalAmount: toBigInt(totalAmount),
        proof,
      });
    });

    return proofsToClaim;
  }
}
