import { BaseVertexAPI } from '../base';
import { IERC20, IERC20__factory } from '@vertex-protocol/contracts';

export type WithoutSubaccountOwner<T> = Omit<T, 'subaccountOwner'>;

export class BaseSpotAPI extends BaseVertexAPI {
  /**
   * Retrieves the ERC20 token contract for a spot product
   */
  async getTokenContractForProduct(productId: number): Promise<IERC20> {
    const config = await this.context.contracts.spotEngine.getConfig(productId);
    return IERC20__factory.connect(config.token, this.context.signerOrProvider);
  }
}
