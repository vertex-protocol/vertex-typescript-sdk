import { BaseVertexGraphClient } from '../base';
import { nowInSeconds, toX18 } from '@vertex-protocol/utils';
import { getMarketEntityId, toHourIndex } from '../../utils';
import { MaxInt256 } from '@ethersproject/constants';
import {
  HourlyHistoricalMarketDataParams,
  HourlyHistoricalMarketDataResponse,
  OrderbookPriceLevelsParams,
  OrderbookPriceLevelsResponse,
} from './types';

export class MarketQueryClient extends BaseVertexGraphClient {
  async getOrderbookPriceLevels(
    params: OrderbookPriceLevelsParams,
  ): Promise<OrderbookPriceLevelsResponse> {
    const data = await this.graph.BookPriceLevelsQuery({
      marketEntityId: getMarketEntityId(params.productId),
      maxPriceX18Exclusive: params.minPriceInclusive
        ? toX18(params.minPriceInclusive)
        : 0,
      minPriceX18Inclusive: params.maxPriceExclusive
        ? toX18(params.maxPriceExclusive)
        : MaxInt256,
    });

    return data.orderbookPriceLevels;
  }

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
