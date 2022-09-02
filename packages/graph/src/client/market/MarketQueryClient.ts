import { BaseVertexGraphClient } from '../base';
import { nowInSeconds } from '@vertex-protocol/utils';
import { getMarketEntityId, toHourIndex } from '../../utils';
import {
  HourlyHistoricalMarketDataParams,
  HourlyHistoricalMarketDataResponse,
} from './types';

export class MarketQueryClient extends BaseVertexGraphClient {
  /**
   * Returns hourly historical market data for a given product.
   *
   * @param params
   */
  async getHourlyHistoricalMarketData(
    params: HourlyHistoricalMarketDataParams,
  ): Promise<HourlyHistoricalMarketDataResponse> {
    const data = await this.graph.HourlyHistoricalMarketDataQuery({
      marketEntityId: getMarketEntityId(params.productId),
      maxHourExclusive: params.maxTimeExclusive
        ? toHourIndex(params.maxTimeExclusive)
        : toHourIndex(nowInSeconds()),
      minHourInclusive: params.minTimeInclusive
        ? toHourIndex(params.minTimeInclusive)
        : 0,
    });

    return data.marketHourlySnapshots;
  }
}
