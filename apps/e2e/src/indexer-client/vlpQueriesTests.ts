import { IndexerClient } from '@vertex-protocol/indexer-client';
import { runWithContext } from '../utils/runWithContext';
import { RunContext } from '../utils/types';
import { nowInSeconds, TimeInSeconds } from '@vertex-protocol/utils';
import { prettyPrint } from '../utils/prettyPrint';

export async function vlpQueriesTests(context: RunContext) {
  console.log('[indexer-client]: Running VLP queries tests');

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

// Run only if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  void runWithContext(vlpQueriesTests);
}
