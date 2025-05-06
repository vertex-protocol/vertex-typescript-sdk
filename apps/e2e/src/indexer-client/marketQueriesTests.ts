import {
  CandlestickPeriod,
  IndexerClient,
} from '@vertex-protocol/indexer-client';
import { RunContext } from '../utils/types';
import { prettyPrint } from '../utils/prettyPrint';
import { nowInSeconds, TimeInSeconds } from '@vertex-protocol/utils';
import { runWithContext } from '../utils/runWithContext';

export async function marketQueriesTests(context: RunContext) {
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
    productIds: [0, 2, 4],
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

  const foundationTokenIncentivesSnapshots =
    await client.getFoundationTokenIncentivesSnapshots({
      granularity: TimeInSeconds.DAY,
      limit: 5,
    });

  prettyPrint(
    'Foundation Token Incentives Snapshots',
    foundationTokenIncentivesSnapshots,
  );

  const latestWithdrawal = await client.getEvents({
    eventTypes: ['withdraw_collateral'],
    limit: {
      type: 'txs',
      value: 1,
    },
  });

  const vrtxTotalSupply = await client.getVrtxTokenInfo({
    tokenInfoType: 'total_supply',
  });

  prettyPrint('VRTX Total Supply', vrtxTotalSupply);

  const vrtxCirculatingSupply = await client.getVrtxTokenInfo({
    tokenInfoType: 'circulating_supply',
  });

  prettyPrint('VRTX Circulating Supply', vrtxCirculatingSupply);

  const stakingV2PoolSnapshots = await client.getStakingV2PoolSnapshots({
    granularity: TimeInSeconds.DAY,
    limit: 5,
  });

  prettyPrint('Staking V2 Pool Snapshots', stakingV2PoolSnapshots);

  const stakingV2TopStakers = await client.getStakingV2TopStakers({
    limit: 20,
  });

  prettyPrint('Staking V2 Top Stakers', stakingV2TopStakers);

  const vrtxSupplySnapshots = await client.getVrtxSupplySnapshots({
    granularity: TimeInSeconds.DAY,
    limit: 5,
  });

  prettyPrint('Vrtx Supply Snapshots', vrtxSupplySnapshots);

  const fastWithdrawalSignature = await client.getFastWithdrawalSignature({
    idx: latestWithdrawal[0].submissionIndex,
  });

  prettyPrint('Fast Withdrawal Signature', fastWithdrawalSignature);

  const vlpSnapshots = await client.getVlpSnapshots({
    maxTimeInclusive: nowInSeconds(),
    limit: 2,
    granularity: TimeInSeconds.DAY,
  });

  prettyPrint('VLP snapshots', vlpSnapshots);
}

console.log('Running market queries tests');
runWithContext(marketQueriesTests);
