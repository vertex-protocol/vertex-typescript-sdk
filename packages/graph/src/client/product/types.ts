import { BigDecimal } from '@vertex-protocol/utils/dist/math/bigDecimal';

export interface HourlyHistoricalProductDataParams {
  productId: number;
  // UNIX timestamp in seconds
  minTimeInclusive?: number;
  // UNIX timestamp in seconds
  maxTimeExclusive?: number;
}

interface BaseProductHourlySnapshot {
  // UNIX seconds
  approximateSnapshotTime: number;
  oraclePrice: BigDecimal;
}

export type SpotProductHourlySnapshot = BaseProductHourlySnapshot;

export interface PerpProductHourlySnapshot extends BaseProductHourlySnapshot {
  openInterest: BigDecimal;
}

// Only one will be defined, depending on product ID
export interface HourlyHistoricalProductDataResponse {
  spotProductSnapshots: SpotProductHourlySnapshot[];
  perpProductSnapshots: PerpProductHourlySnapshot[];
}
