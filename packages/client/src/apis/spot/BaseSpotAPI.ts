import { BaseVertexAPI } from '../base';
import { IERC20, IERC20__factory } from '@vertex-protocol/contracts';

export class BaseSpotAPI extends BaseVertexAPI {
  /**
   * Retrieves the ERC20 token contract for a spot product
   */
  async getTokenContractForProduct(productId: number): Promise<IERC20> {
    const product = await this.context.contracts.spotEngine.getProduct(
      productId,
    );
    return IERC20__factory.connect(
      product[0].token,
      this.context.chainSignerOrProvider,
    );
  }
}
