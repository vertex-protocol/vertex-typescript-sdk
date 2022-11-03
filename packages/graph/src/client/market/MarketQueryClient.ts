import { BaseVertexGraphClient } from '../base';
import { fromX18, nowInSeconds, toBigDecimal } from '@vertex-protocol/utils';
import { fromHourIndex, getMarketEntityId, toHourIndex } from '../../utils';
import {
  Candlestick,
  GetCandlesticksParams,
  GetCandlesticksResponse,
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

    return data.marketHourlySnapshots.map((snapshot) => {
      return {
        approximateSnapshotTime: fromHourIndex(snapshot.hour),
        cumulativeVolumeQuote: toBigDecimal(snapshot.volumeQuote),
        cumulativeNumOrders: toBigDecimal(snapshot.volumeNumOrders),
        lastFilledPrice: fromX18(snapshot.lastFillPriceX18),
      };
    });
  }

  /**
   * Returns candlesticks for a given product.
   *
   * @param params
   */
  async getCandlesticks(
    params: GetCandlesticksParams,
  ): Promise<GetCandlesticksResponse> {
    const data = await this.graph.CandlesticksQuery({
      // Volume is cumulative, so we need an additional datapoint
      limit: (params.limit ?? 100) + 1,
      marketEntityId: getMarketEntityId(params.productId),
      maxTimeExclusive: Math.floor(params.beforeTime ?? nowInSeconds()),
    });

    // Reverse the array as we want data in reverse chronological order
    const reverseChronologicalCandlesticks = data.candlesticks.reverse();
    return reverseChronologicalCandlesticks.map(
      (snapshot, idx): Candlestick => {
        const prevSnapshot =
          idx < reverseChronologicalCandlesticks.length
            ? reverseChronologicalCandlesticks[idx + 1]
            : undefined;
        const cumulativeVolume = toBigDecimal(snapshot.volumeQuote);
        const volume = prevSnapshot
          ? cumulativeVolume.minus(prevSnapshot.volumeQuote)
          : cumulativeVolume;

        return {
          close: fromX18(snapshot.closeX18).toNumber(),
          high: fromX18(snapshot.highX18).toNumber(),
          low: fromX18(snapshot.lowX18).toNumber(),
          open: fromX18(snapshot.openX18).toNumber(),
          time: toBigDecimal(snapshot.time).toNumber(),
          volume: volume.toNumber(),
        };
      },
    );
  }
}
