import { BaseVertexAPI } from '../base';
import { GetIndexerPerpPricesParams } from '@vertex-protocol/indexer-client';

export class PerpQueryAPI extends BaseVertexAPI {
  /**
   * Gets the latest index & mark price for a perp product
   * @param params
   */
  async getPrices(params: GetIndexerPerpPricesParams) {
    return this.context.indexerClient.getPerpPrices(params);
  }
}
