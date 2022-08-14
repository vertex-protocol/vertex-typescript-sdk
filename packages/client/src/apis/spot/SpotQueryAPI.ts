import { BaseVertexAPI } from '../base';

export class SpotQueryAPI extends BaseVertexAPI {
  // From querier
  async getAllSpotProducts() {
    console.log('hi eslint');
  }

  async getHistoricalInterestRates() {
    // map snapshots -> rates
    console.log('hi eslint');
  }
}
