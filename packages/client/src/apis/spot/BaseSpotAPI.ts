import { BaseVertexAPI } from '../base';
import { IERC20, IERC20__factory } from '@vertex-protocol/contracts';
import { ProductIdOrTokenAddress } from './types';

export class BaseSpotAPI extends BaseVertexAPI {
  /**
   * Retrieves the ERC20 token contract for a spot product
   */
  async getTokenContractForProduct(
    params: ProductIdOrTokenAddress,
  ): Promise<IERC20> {
    let tokenAddress: string;
    if ('productId' in params) {
      const config = await this.context.contracts.spotEngine.getConfig(
        params.productId,
      );
      tokenAddress = config.token;
    } else {
      tokenAddress = params.tokenAddress;
    }
    return IERC20__factory.connect(tokenAddress, this.context.signerOrProvider);
  }
}
