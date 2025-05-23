import { VertexAbis } from '@vertex-protocol/contracts';
import {
  toBigDecimal,
  toBigInt,
  toIntegerString,
} from '@vertex-protocol/utils';
import { WriteContractParameters } from 'viem';
import { BaseVertexAPI } from '../base';
import {
  ClaimLiquidTokensParams,
  ClaimLiquidTokensSatelliteParams,
} from './types';

export class BaseRewardsAPI extends BaseVertexAPI {
  /**
   * Util function to share logic between claimLiquidTokens and claimAndStakeLiquidTokens
   * @param params
   */
  async getClaimLiquidTokensContractParams(
    params: ClaimLiquidTokensParams | ClaimLiquidTokensSatelliteParams,
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
