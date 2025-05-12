import { IndexerClient } from '@vertex-protocol/indexer-client';
import { runWithContext } from '../utils/runWithContext';
import { RunContext } from '../utils/types';
import { TimeInSeconds } from '@vertex-protocol/utils';
import { prettyPrint } from '../utils/prettyPrint';

async function rewardsQueriesTests(context: RunContext) {
  const walletClient = context.getWalletClient();

  const client = new IndexerClient({
    url: context.endpoints.indexer,
    walletClient,
  });

  const foundationTokenIncentivesSnapshots =
    await client.getFoundationTokenIncentivesSnapshots({
      granularity: TimeInSeconds.DAY,
      limit: 5,
    });

  prettyPrint(
    'Foundation Token Incentives Snapshots',
    foundationTokenIncentivesSnapshots,
  );
}

console.log('[indexer-client]: Running rewards queries tests');
runWithContext(rewardsQueriesTests);
