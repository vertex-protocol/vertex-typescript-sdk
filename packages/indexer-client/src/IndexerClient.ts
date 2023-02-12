import { IndexerBaseClient } from './IndexerBaseClient';
import {
  IndexerSubaccountSummaryParams,
  IndexerSubaccountSummaryResponse,
} from './types';
import { subaccountToHex } from '@vertex-protocol/contracts';
import { mapIndexerServerBalance } from './dataMappers';

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
}
