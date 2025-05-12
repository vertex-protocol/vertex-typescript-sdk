import { IndexerClient } from '@vertex-protocol/indexer-client';
import { runWithContext } from '../utils/runWithContext';
import { RunContext } from '../utils/types';
import { nowInSeconds, TimeInSeconds } from '@vertex-protocol/utils';
import { prettyPrint } from '../utils/prettyPrint';

async function vlpQueriesTests(context: RunContext) {
  const walletClient = context.getWalletClient();

  const client = new IndexerClient({
    url: context.endpoints.indexer,
    walletClient,
  });

  const vlpSnapshots = await client.getVlpSnapshots({
    maxTimeInclusive: nowInSeconds(),
    limit: 2,
    granularity: TimeInSeconds.DAY,
  });

  prettyPrint('VLP snapshots', vlpSnapshots);
}

console.log('[indexer-client]: Running VLP queries tests');
runWithContext(vlpQueriesTests);
