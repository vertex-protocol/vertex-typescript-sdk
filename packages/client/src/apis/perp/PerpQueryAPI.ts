import { BaseVertexAPI } from '../base';
import {
  getAllProducts,
  isPerpProduct,
  PerpProduct,
} from '@vertex-protocol/contracts';

export class PerpQueryAPI extends BaseVertexAPI {
  /**
   * Retrieves all perp product states from the on-chain contract s
   */
  async getAllPerpProducts(): Promise<PerpProduct[]> {
    const allProducts = await getAllProducts(this.context.contracts);
    return allProducts.filter(isPerpProduct);
  }
}
