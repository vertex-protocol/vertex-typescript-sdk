import { BaseVertexAPI } from '../base';
import {
  getAllProducts,
  isSpotProduct,
  SpotProduct,
} from '@vertex-protocol/contracts';

export class SpotQueryAPI extends BaseVertexAPI {
  async getAllSpotProducts(): Promise<SpotProduct[]> {
    const allProducts = await getAllProducts(this.context.contracts);
    return allProducts.filter(isSpotProduct);
  }

  async getHistoricalInterestRates() {
    // add snapshots to schema, finish the snapshots query (HourlySpotProductSnapshotsQuery.graphql)
    // graph client to return snapshots, map to rates using `interest.ts`
    console.log('hi eslint');
  }
}
