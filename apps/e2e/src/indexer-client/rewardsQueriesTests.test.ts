import { IndexerClient } from '@vertex-protocol/indexer-client';
import { runWithContext } from '../utils/runWithContext';
import { RunContext } from '../utils/types';
import { TimeInSeconds } from '@vertex-protocol/utils';
import test from 'node:test';
import { debugPrint } from '../utils/debugPrint';

async function rewardsQueriesTests(context: RunContext) {
  const walletClient = context.getWalletClient();

  const client = new IndexerClient({
    url: context.endpoints.indexer,
    walletClient,
  });

  const rewards = await client.getRewards({
    address: walletClient.account.address,
    limit: 5,
  });

  debugPrint('Rewards', rewards);

  const foundationTokenIncentivesSnapshots =
    await client.getFoundationTokenIncentivesSnapshots({
      granularity: TimeInSeconds.DAY,
      limit: 5,
    });

  debugPrint(
    'Foundation Token Incentives Snapshots',
    foundationTokenIncentivesSnapshots,
  );

  const claimFoundationRewardsMerkleProofs =
    await client.getClaimFoundationRewardsMerkleProofs({
      address: walletClient.account.address,
    });

  debugPrint(
    'Claim Foundation Rewards Merkle Proofs',
    claimFoundationRewardsMerkleProofs,
  );

  const takerRewards = await client.getTakerRewards({
    address: walletClient.account.address,
    limit: 5,
  });

  debugPrint('Taker Rewards', takerRewards);

  const claimVrtxMerkleProofs = await client.getClaimVrtxMerkleProofs({
    address: walletClient.account.address,
  });

  debugPrint('Claim Vrtx Merkle Proofs', claimVrtxMerkleProofs);

  if (
    context.env.chainEnv === 'blastTestnet' ||
    context.env.chainEnv === 'blast'
  ) {
    const blastPoints = await client.getBlastPoints({
      address: walletClient.account.address,
    });
    const blitzPoints = await client.getBlitzPoints({
      address: walletClient.account.address,
    });

    const blitzPointsLeaderboard =
      await client.getPaginatedBlitzPointsLeaderboard({
        startCursor: '2',
        epoch: 1,
        limit: 10,
      });

    debugPrint('Blitz & Blast Points', {
      blastPoints,
      blitzPoints,
    });

    debugPrint('Blitz Points Leaderboard', blitzPointsLeaderboard);
  }

  if (
    context.env.chainEnv === 'sonicTestnet' ||
    context.env.chainEnv === 'sonic'
  ) {
    const sonicPoints = await client.getSonicPoints({
      address: walletClient.account.address,
    });

    const sonicPointsLeaderboard =
      await client.getPaginatedSonicPointsLeaderboard({
        limit: 10,
      });

    debugPrint('Sonic Points', sonicPoints);
    debugPrint('Sonic Points Leaderboard', sonicPointsLeaderboard);
  }
}

void test('[indexer-client]: Running rewards queries tests', () =>
  runWithContext(rewardsQueriesTests));
