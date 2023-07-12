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
  async getPerpPrices(params: GetIndexerPerpPricesParams) {
    return this.context.indexerClient.getPerpPrices(params);
  }

  /**
   * Gets the latest index & mark price for multiple perp products
   * @param params
   */
  async getMultiProductPerpPrices(
    params: GetIndexerMultiProductPerpPricesParams,
  ) {
    return this.context.indexerClient.getMultiProductPerpPrices(params);
  }
}
