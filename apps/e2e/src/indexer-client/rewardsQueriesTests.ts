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

  const rewards = await client.getRewards({
    address: walletClient.account.address,
    limit: 5,
  });

  prettyPrint('Rewards', rewards);

  const foundationTokenIncentivesSnapshots =
    await client.getFoundationTokenIncentivesSnapshots({
      granularity: TimeInSeconds.DAY,
      limit: 5,
    });

  prettyPrint(
    'Foundation Token Incentives Snapshots',
    foundationTokenIncentivesSnapshots,
  );

  const claimFoundationRewardsMerkleProofs =
    await client.getClaimFoundationRewardsMerkleProofs({
      address: walletClient.account.address,
    });

  prettyPrint(
    'Claim Foundation Rewards Merkle Proofs',
    claimFoundationRewardsMerkleProofs,
  );

  const takerRewards = await client.getTakerRewards({
    address: walletClient.account.address,
    limit: 5,
  });

  prettyPrint('Taker Rewards', takerRewards);

  const claimVrtxMerkleProofs = await client.getClaimVrtxMerkleProofs({
    address: walletClient.account.address,
  });

  prettyPrint('Claim Vrtx Merkle Proofs', claimVrtxMerkleProofs);

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

    prettyPrint('Blitz & Blast Points', {
      blastPoints,
      blitzPoints,
    });

    prettyPrint('Blitz Points Leaderboard', blitzPointsLeaderboard);
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

    prettyPrint('Sonic Points', sonicPoints);
    prettyPrint('Sonic Points Leaderboard', sonicPointsLeaderboard);
  }
}

console.log('[indexer-client]: Running rewards queries tests');
runWithContext(rewardsQueriesTests);
