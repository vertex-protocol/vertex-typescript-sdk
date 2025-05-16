import {
  CandlestickPeriod,
  IndexerClient,
} from '@vertex-protocol/indexer-client';
import { RunContext } from '../utils/types';
import { prettyPrint } from '../utils/prettyPrint';
import { nowInSeconds, TimeInSeconds } from '@vertex-protocol/utils';
import { runWithContext } from '../utils/runWithContext';
import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { accountSetup } from '../utils/accountSetup';

export async function marketsQueriesTests(context: RunContext) {
  console.log('[indexer-client]: Running markets queries tests');

  const walletClient = context.getWalletClient();

  const client = new IndexerClient({
    url: context.endpoints.indexer,
    walletClient,
  });

  const fundingRate = await client.getFundingRate({
    productId: 2,
  });

  prettyPrint('Funding rate', fundingRate.fundingRate.toString());

  const fundingRates = await client.getMultiProductFundingRates({
    productIds: [2, 4],
  });

  prettyPrint('Multiple products funding rate', fundingRates);

  const price = await client.getPerpPrices({
    productId: 2,
  });

  prettyPrint('Perp prices', price);

  const perpPrices = await client.getMultiProductPerpPrices({
    productIds: [2, 4, 6],
  });

  prettyPrint('Multiple products perp prices', perpPrices);

  const oraclePrices = await client.getOraclePrices({
    productIds: [1, 2, 3, 4],
  });

  prettyPrint('Oracle Prices', oraclePrices);

  const usdcPrice = await client.getQuotePrice();

  prettyPrint('USDC Price', usdcPrice);

  const candlesticks = await client.getCandlesticks({
    limit: 2,
    maxTimeInclusive: nowInSeconds(),
    period: CandlestickPeriod.DAY,
    productId: 3,
  });
  prettyPrint('Candlesticks', candlesticks);

  const marketSnapshots = await client.getMarketSnapshots({
    granularity: TimeInSeconds.HOUR,
    limit: 1,
    productIds: [2, 3, 4],
  });

  prettyPrint('Market snapshots', marketSnapshots);

  const productSnapshots = await client.getProductSnapshots({
    limit: 2,
    maxTimestampInclusive: nowInSeconds(),
    productId: 2,
  });

  prettyPrint('Product snapshots', productSnapshots);

  const multiProductSnapshots = await client.getMultiProductSnapshots({
    productIds: [2, 3],
  });

  prettyPrint(
    'Multiple products snapshots',
    Object.values(multiProductSnapshots).pop(),
  );

  const now = nowInSeconds();
  const multiTimestampProductSnapshots = await client.getMultiProductSnapshots({
    productIds: [QUOTE_PRODUCT_ID, 2, 4],
    maxTimestampInclusive: [
      now,
      now - TimeInSeconds.HOUR,
      now - TimeInSeconds.DAY,
    ],
  });

  prettyPrint(
    'Multi timestamp and multi product snapshots',
    multiTimestampProductSnapshots,
  );
}

// Run only if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  void (async function run() {
    await runWithContext(accountSetup);
    await runWithContext(marketsQueriesTests);
  })();
}
