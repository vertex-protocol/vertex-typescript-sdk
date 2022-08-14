import { BaseVertexAPI } from '../base';
import {
  getAllSpotProducts,
  GetAllSpotProductsResponse,
} from '@vertex-protocol/contracts';

export class SpotQueryAPI extends BaseVertexAPI {
  async getAllSpotProducts(): Promise<GetAllSpotProductsResponse> {
    return getAllSpotProducts(this.context.contracts);
  }

  async getHistoricalInterestRates() {
    // add snapshots to schema, finish the snapshots query (HourlySpotProductSnapshotsQuery.graphql)
    // graph client to return snapshots, map to rates using `interest.ts`
    console.log('hi eslint');
  }
}
