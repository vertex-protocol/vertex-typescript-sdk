import { GetEngineMaxWithdrawableParams } from '@vertex-protocol/engine-client';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import { Address } from 'viem';
import { BaseSpotAPI } from './BaseSpotAPI';
import { GetTokenAllowanceParams, GetTokenWalletBalanceParams } from './types';

export class SpotQueryAPI extends BaseSpotAPI {
  /**
   * Gets the estimated max withdrawable amount for a product
   * @param params
   */
  async getMaxWithdrawable(params: GetEngineMaxWithdrawableParams) {
    return this.context.engineClient.getMaxWithdrawable(params);
  }

  /**
   * Helper to get current token balance in the user's wallet (i.e. not in a Vertex subaccount)
   */
  async getTokenWalletBalance({
    address,
    ...rest
  }: GetTokenWalletBalanceParams): Promise<bigint> {
    const token = await this.getTokenContractForProduct(rest);
    return token.read.balanceOf([address as Address]);
  }

  /**
   * Helper to get current token allowance
   */
  async getTokenAllowance({
    address,
    ...rest
  }: GetTokenAllowanceParams): Promise<BigDecimal> {
    const token = await this.getTokenContractForProduct(rest);
    return toBigDecimal(
      await token.read.allowance([
        address as Address,
        this.getEndpointAddress() as Address,
      ]),
    );
  }
}
