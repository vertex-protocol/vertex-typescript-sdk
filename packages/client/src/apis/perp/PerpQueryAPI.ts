import { BaseVertexAPI } from '../base';
import {
  getAllProducts,
  isPerpProduct,
  PerpProduct,
} from '@vertex-protocol/contracts';

export class PerpQueryAPI extends BaseVertexAPI {
  async getAllPerpProducts(): Promise<PerpProduct[]> {
    const allProducts = await getAllProducts(this.context.contracts);
    return allProducts.filter(isPerpProduct);
  }

  async getHistoricalFundingRates() {
    // add snapshots to schema, finish the snapshots query (HourlyPerpProductSnapshotsQuery.graphql)
    // graph client to return snapshots, map to rates using `funding.ts`
    console.log('hi eslint');
  }
}
