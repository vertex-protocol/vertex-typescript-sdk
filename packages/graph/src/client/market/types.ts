import {
  BookPriceLevelsQueryQuery,
  HourlyHistoricalMarketDataQueryQuery,
} from '../../generated';
import { BigDecimal } from '@vertex-protocol/utils';

export interface OrderbookPriceLevelsParams {
  productId: number;
  minPriceInclusive?: BigDecimal;
  maxPriceExclusive?: BigDecimal;
}

export type OrderbookPriceLevelsResponse =
  BookPriceLevelsQueryQuery['orderbookPriceLevels'];

export interface HourlyHistoricalMarketDataParams {
  productId: number;
  // UNIX timestamp in seconds
  minTimeInclusive?: number;
  maxTimeExclusive?: number;
}

export type HourlyHistoricalMarketDataResponse =
  HourlyHistoricalMarketDataQueryQuery['marketHourlySnapshots'];
