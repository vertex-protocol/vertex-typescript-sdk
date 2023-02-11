import { BaseVertexGraphClient } from '../base';
import { fromX18, nowInSeconds, toBigDecimal } from '@vertex-protocol/utils';
import { fromHourIndex, getProductEntityId, toHourIndex } from '../../utils';
import {
  HourlyHistoricalProductDataParams,
  HourlyHistoricalProductDataResponse,
} from './types';

export class ProductQueryClient extends BaseVertexGraphClient {
  /**
   * Retrieves historical product snapshots for a given product
   * @param params
   */
  async getHourlyHistoricalProductData(
    params: HourlyHistoricalProductDataParams,
  ): Promise<HourlyHistoricalProductDataResponse> {
    const baseResponse = await this.graph.HourlyHistoricalProductDataQuery({
      maxHourExclusive: toHourIndex(params.maxTimeExclusive ?? nowInSeconds()),
      minHourInclusive: toHourIndex(params.minTimeInclusive ?? 0),
      productEntityId: getProductEntityId(params.productId),
    });

    return {
      spotProductSnapshots: baseResponse.spotProductSnapshots.map(
        (snapshot) => {
          return {
            approximateSnapshotTime: fromHourIndex(snapshot.periodIndex),
            oraclePrice: fromX18(snapshot.priceX18),
          };
        },
      ),
      perpProductSnapshots: baseResponse.perpProductSnapshots.map(
        (snapshot) => {
          return {
            approximateSnapshotTime: fromHourIndex(snapshot.periodIndex),
            oraclePrice: fromX18(snapshot.liquidationPriceX18),
            openInterest: toBigDecimal(snapshot.openInterest),
          };
        },
      ),
    };
  }
}
