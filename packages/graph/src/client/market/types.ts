import { HourlyHistoricalMarketDataQueryQuery } from '../../generated';

export interface HourlyHistoricalMarketDataParams {
  productId: number;
  // UNIX timestamp in seconds
  minTimeInclusive?: number;
  // UNIX timestamp in seconds
  maxTimeExclusive?: number;
}

export type HourlyHistoricalMarketDataResponse =
  HourlyHistoricalMarketDataQueryQuery['marketHourlySnapshots'];
