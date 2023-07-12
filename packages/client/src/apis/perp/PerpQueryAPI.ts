import { BaseVertexAPI } from '../base';
import {
  GetIndexerMultiProductPerpPricesParams,
  GetIndexerPerpPricesParams,
} from '@vertex-protocol/indexer-client';

export class PerpQueryAPI extends BaseVertexAPI {
  /**
   * Gets the latest index & mark price for a perp product
   * @param params
   */
  async getPrices(params: GetIndexerPerpPricesParams) {
    return this.context.indexerClient.getPerpPrices(params);
  }

  /**
   * Gets the latest index & mark price for multiple perp products
   * @param params
   */
  async getMultiProductPrices(params: GetIndexerMultiProductPerpPricesParams) {
    return this.context.indexerClient.getMultiProductPerpPrices(params);
  }
}
