import {
  IndexerServerSubaccountBalance,
  IndexerSubaccountBalance,
} from './types';
import { toBigDecimal } from '@vertex-protocol/utils';

export function mapIndexerServerBalance(
  balance: IndexerServerSubaccountBalance,
): IndexerSubaccountBalance {
  return {
    productId: balance.product_id,
    unrealizedPnl: toBigDecimal(balance.unrealized_pnl),
  };
}
