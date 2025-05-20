import { IndexerClient } from '@vertex-protocol/indexer-client';
import { prettyPrint } from '../utils/prettyPrint';
import { RunContext } from '../utils/types';
import { TimeInSeconds } from '@vertex-protocol/utils';
import { runWithContext } from '../utils/runWithContext';
import { it } from 'node:test';

async function stakingQueriesTests(context: RunContext) {
  const walletClient = context.getWalletClient();

  const client = new IndexerClient({
    url: context.endpoints.indexer,
    walletClient,
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
}

it('[indexer-client]: Running staking queries tests', () =>
  runWithContext(stakingQueriesTests));
