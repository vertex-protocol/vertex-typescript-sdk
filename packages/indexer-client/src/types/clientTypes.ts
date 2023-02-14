import { BigDecimal } from '@vertex-protocol/utils';
import { Subaccount } from '@vertex-protocol/contracts';

export type IndexerSubaccountSummaryParams = Subaccount;

export interface IndexerSubaccountSummaryResponse {
  exists: boolean;
  spotBalances: IndexerSubaccountBalance[];
  spotLpBalances: IndexerSubaccountBalance[];
  perpBalances: IndexerSubaccountBalance[];
  perpLpBalances: IndexerSubaccountBalance[];
}

export interface IndexerSubaccountBalance {
  productId: number;
  unrealizedPnl: BigDecimal;
}
