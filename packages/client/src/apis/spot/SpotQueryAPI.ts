import { BaseVertexAPI } from '../base';
import {
  getAllProducts,
  isSpotProduct,
  SpotProduct,
} from '@vertex-protocol/contracts';

export class SpotQueryAPI extends BaseVertexAPI {
  /**
   * Retrieves all spot product states from the on-chain contracts
   */
  async getAllSpotProducts(): Promise<SpotProduct[]> {
    const allProducts = await getAllProducts(this.context.contracts);
    return allProducts.filter(isSpotProduct);
  }
}
