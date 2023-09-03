import { BaseVertexAPI } from '../base';
import {
  ClaimLiquidTokensParams,
  ClaimTokensToLbaParams,
  VestLiquidTokensParams,
  VrtxTokenAmountParams,
} from './types';

export class VrtxTokenExecuteAPI extends BaseVertexAPI {
  /**
   * Claim VRTX tokens received during the airdrop phase to be deposited into the LBA pool
   *
   * @param params
   */
  claimTokensToLba(params: ClaimTokensToLbaParams) {
    return this.context.contracts.vrtxAirdrop.claimToLBA(
      params.amount,
      // Get total amount
      '0',
      // Get proof
      [],
    );
  }

  /**
   * Claim all available vested tokens
   */
  claimVestedTokens() {
    return this.context.contracts.vrtxVesting.claim();
  }

  /**
   * Deposit USDC into the LBA pool
   *
   * @param params
   */
  depositLbaUsdc(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxLba.depositUsdc(params.amount);
  }

  /**
   * Withdraw USDC from the LBA pool
   *
   * @param params
   */
  withdrawLbaUsdc(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxLba.withdrawUsdc(params.amount);
  }

  /**
   * Withdraw LP liquidity tokens from the LBA pool after the AMM has been created
   *
   * @param params
   */
  withdrawLbaLiquidity(params: VrtxTokenAmountParams) {
    return this.context.contracts.vrtxLba.withdrawLiquidity(params.amount);
  }

  /**
   * Submits earned VRTX tokens to be vested
   *
   * @param params
   */
  vestLiquidTokens(params: VestLiquidTokensParams) {
    return this.context.contracts.vrtxAirdrop.vest(
      params.epoch,
      params.amount,
      // Get total amount
      '0',
      // Get proof
      [],
    );
  }

  /**
   * Claim earned VRTX tokens directly without vesting, resulting in a 50% burn
   *
   * @param params
   */
  claimLiquidTokens(params: ClaimLiquidTokensParams) {
    return this.context.contracts.vrtxAirdrop.claim(
      params.epoch,
      params.amount,
      // Get total amount
      '0',
      // Get proof
      [],
    );
  }
}
