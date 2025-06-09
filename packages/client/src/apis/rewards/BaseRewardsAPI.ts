import { toBigDecimal, toBigInt } from '@vertex-protocol/utils';
import { BaseVertexAPI } from '../base';
import { RewardsLiquidTokensProof } from './types';

export class BaseRewardsAPI extends BaseVertexAPI {
  /**
   * Util function to share logic between claimLiquidTokens and claimAndStakeLiquidTokens
   * @returns Proofs with a claimable amount to claim.
   */
  async getClaimAllLiquidTokensContractParams() {
    const address = this.getWalletClientAddress();

    const proofs = await this.context.indexerClient.getClaimVrtxMerkleProofs({
      address,
    });

    const amountsClaimed =
      await this.context.contracts.vrtxAirdrop.read.getClaimed([address]);

    return proofs.reduce<RewardsLiquidTokensProof[]>(
      (acc, { proof, totalAmount }, idx) => {
        if (idx === 0) return acc; // week 0 is invalid

        const amountToClaim = totalAmount.minus(
          // Some wallets seem to throw a `RangeError` here if we do amountsClaimed[params.epoch]
          // Likely because `amountsClaimed` isn't a simple array but a proxy
          toBigDecimal(amountsClaimed.at(idx) ?? 0),
        );

        if (!amountToClaim.isZero()) {
          acc.push({
            epoch: idx,
            amount: toBigInt(amountToClaim),
            totalAmount: toBigInt(totalAmount),
            proof,
          });
        }

        return acc;
      },
      [],
    );
  }
}
