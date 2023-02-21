import { IndexerBaseClient } from './IndexerBaseClient';
import {
  GetIndexerFundingRateParams,
  GetIndexerFundingRateResponse,
  IndexerSubaccountSummaryParams,
  IndexerSubaccountSummaryResponse,
} from './types';
import { subaccountToHex } from '@vertex-protocol/contracts';
import { mapIndexerServerBalance } from './dataMappers';
import { fromX18 } from '@vertex-protocol/utils';

export class IndexerClient extends IndexerBaseClient {
  /**
   * Retrieves the indexer subaccount summary, which contains PnL per position
   * @param params
   */
  async getSubaccountSummary(
    params: IndexerSubaccountSummaryParams,
  ): Promise<IndexerSubaccountSummaryResponse> {
    const baseResponse = await this.query('summary', {
      subaccount: subaccountToHex({
        subaccountOwner: params.subaccountOwner,
        subaccountName: params.subaccountName,
      }),
    });
    return {
      exists: baseResponse.exists,
      perpBalances: baseResponse.perp_balances.map(mapIndexerServerBalance),
      perpLpBalances: baseResponse.perp_lp_balances.map(
        mapIndexerServerBalance,
      ),
      spotBalances: baseResponse.spot_balances.map(mapIndexerServerBalance),
      spotLpBalances: baseResponse.spot_lp_balances.map(
        mapIndexerServerBalance,
      ),
    };
  }

  /**
   * Retrieves funding rate for a product, where 1 = 100%
   * @param params
   */
  async getFundingRate(
    params: GetIndexerFundingRateParams,
  ): Promise<GetIndexerFundingRateResponse> {
    const baseResponse = await this.query('funding_rate', {
      product_id: params.productId,
    });

    return {
      fundingRate: fromX18(baseResponse.funding_rate_x18),
      updateTime: baseResponse.update_time,
      productId: baseResponse.product_id,
    };
  }
}
