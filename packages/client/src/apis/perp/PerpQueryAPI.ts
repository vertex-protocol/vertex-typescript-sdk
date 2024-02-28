import {
  IndexerQueryMultiProductPerpPricesParams,
  IndexerQueryPerpPricesParams,
} from '@vertex-protocol/indexer-client';
import { BaseVertexAPI } from '../base';

export class PerpQueryAPI extends BaseVertexAPI {
  /**
   * Gets the latest index & mark price for a perp product
   * @param params
   */
  async getPerpPrices(params: IndexerQueryPerpPricesParams) {
    return this.context.indexerClient.getPerpPrices(params);
  }

  /**
   * Gets the latest index & mark price for multiple perp products
   * @param params
   */
  async getMultiProductPerpPrices(
    params: IndexerQueryMultiProductPerpPricesParams,
  ) {
    return this.context.indexerClient.getMultiProductPerpPrices(params);
  }
}
