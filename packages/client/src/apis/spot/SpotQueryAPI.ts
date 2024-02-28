import { EngineQueryMaxWithdrawableParams } from '@vertex-protocol/engine-client';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import { BaseSpotAPI } from './BaseSpotAPI';
import {
  QueryTokenAllowanceParams,
  QueryTokenWalletBalanceParams,
} from './types';

export class SpotQueryAPI extends BaseSpotAPI {
  /**
   * Gets the estimated max withdrawable amount for a product
   * @param params
   */
  async getMaxWithdrawable(params: EngineQueryMaxWithdrawableParams) {
    return this.context.engineClient.getMaxWithdrawable(params);
  }

  /**
   * Helper to get current token balance in the user's wallet (i.e. not in a Vertex subaccount)
   */
  async getTokenWalletBalance({
    address,
    ...rest
  }: QueryTokenWalletBalanceParams): Promise<bigint> {
    const token = await this.getTokenContractForProduct(rest);
    return token.balanceOf(address);
  }

  /**
   * Helper to get current token allowance
   */
  async getTokenAllowance({
    address,
    ...rest
  }: QueryTokenAllowanceParams): Promise<BigDecimal> {
    const token = await this.getTokenContractForProduct(rest);
    return toBigDecimal(
      await token.allowance(address, this.getEndpointAddress()),
    );
  }
}
