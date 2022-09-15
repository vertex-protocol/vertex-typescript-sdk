import { HourlyHistoricalMarketDataQueryQuery } from '../../generated';
import { CandlestickPeriod } from './CandlestickPeriod';

export interface HourlyHistoricalMarketDataParams {
  productId: number;
  // UNIX timestamp in seconds
  minTimeInclusive?: number;
  // UNIX timestamp in seconds
  maxTimeExclusive?: number;
}

export type HourlyHistoricalMarketDataResponse =
  HourlyHistoricalMarketDataQueryQuery['marketHourlySnapshots'];

export interface GetCandlesticksParams {
  productId: number;
  period: CandlestickPeriod;
  // UNIX timestamp in seconds, defaults to now
  beforeTime?: number;
  // Number of candles to return counting back from beforeTime, defaults to 100
  limit?: number;
}

// Semi-Tradingview compatible bars
export interface Candlestick {
  // In SECONDS, for TV compat, this needs to be in millis
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type GetCandlesticksResponse = Candlestick[];
