import { VertexAbis } from '@vertex-protocol/contracts';
import { toBigInt } from '@vertex-protocol/utils';
import {
  ContractFunctionName,
  encodeAbiParameters,
  encodePacked,
  Hex,
  prepareEncodeFunctionData,
  zeroHash,
} from 'viem';
import { BaseRewardsAPI } from './BaseRewardsAPI';
import {
  ClaimLiquidTokensParams,
  SatelliteTransactionType,
  VrtxTokenAmountParams,
} from './types';

export class RewardsQueryAPI extends BaseRewardsAPI {
  /**
   * Get the estimated CCIP fee for the `stakeAs` transaction
   * @param params
   * @returns
   */
  getEstimatedStakeAsCcipFee(params: VrtxTokenAmountParams) {
    const address = this.getWalletClientAddress();

    if (!address) {
      throw new Error('No wallet client address found');
    }

    const encodedAbiParams = encodeAbiParameters(
      this.getFunctionAbiInputs('stakeAs'),
      [address, toBigInt(params.amount)],
    );

    return this.getEstimatedCcipFee(
      SatelliteTransactionType.STAKE_AS,
      encodedAbiParams,
    );
  }

  /**
   * Get the estimated CCIP fee for the `withdraw` transaction
   * @returns
   */
  getEstimatedWithdrawCcipFee() {
    return this.getEstimatedCcipFee(SatelliteTransactionType.WITHDRAW);
  }

  /**
   * Get the estimated CCIP fee for the `withdrawSlow` transaction
   * @returns
   */
  getEstimatedWithdrawSlowCcipFee() {
    return this.getEstimatedCcipFee(SatelliteTransactionType.WITHDRAW_SLOW);
  }

  /**
   * Get the estimated CCIP fee for the `claimWithdraw` transaction
   * @returns
   */
  getEstimatedClaimWithdrawCcipFee() {
    return this.getEstimatedCcipFee(SatelliteTransactionType.CLAIM_WITHDRAW);
  }

  /**
   * Get the estimated CCIP fee for the `claim` transaction
   * @param params
   * @returns
   */
  async getClaimLiquidTokensCcipFee(params: ClaimLiquidTokensParams) {
    const encodedAbiParams = encodeAbiParameters(
      this.getFunctionAbiInputs('claim'),
      await this.getClaimLiquidTokensContractParams(params),
    );

    return this.getEstimatedCcipFee(
      SatelliteTransactionType.CLAIM,
      encodedAbiParams,
    );
  }

  /**
   * Get the estimated CCIP fee for the `claimAndStake` transaction
   * @param params
   * @returns
   */
  async getClaimAndStakeLiquidTokensCcipFee(params: ClaimLiquidTokensParams) {
    const encodedAbiParams = encodeAbiParameters(
      this.getFunctionAbiInputs('claimAndStake'),
      await this.getClaimLiquidTokensContractParams(params),
    );

    return this.getEstimatedCcipFee(
      SatelliteTransactionType.CLAIM_AND_STAKE,
      encodedAbiParams,
    );
  }

  /**
   * Util function to get estimate of CCIP Fee
   * @private
   * @param transactionType
   * @param encodedAbiParams
   */
  private getEstimatedCcipFee(
    transactionType: SatelliteTransactionType,
    encodedAbiParams: Hex = zeroHash,
  ) {
    const encodedTx = encodePacked(
      ['uint8', 'bytes'],
      [transactionType, encodedAbiParams],
    );

    return this.context.contracts.vrtxStakingV2Satellite.read.estimateCcipGas([
      encodedTx,
    ]);
  }

  /**
   * Util function to get parsed function input data
   * @private
   * @param functionName
   * @returns
   */
  private getFunctionAbiInputs(
    functionName: ContractFunctionName<VertexAbis['vrtxStakingV2Satellite']>,
  ) {
    return prepareEncodeFunctionData({
      abi: this.context.contracts.vrtxStakingV2Satellite.abi,
      functionName,
    }).abi[0].inputs;
  }
}
