import { Subaccount } from '@vertex-protocol/contracts';
import { IndexerClient } from '@vertex-protocol/indexer-client';
import { getServerError } from '../utils/getServerError';
import { prettyPrint } from '../utils/prettyPrint';
import { RunContext } from '../utils/types';

export async function leaderboardTests(context: RunContext) {
  const walletClient = context.getWalletClient();
  const chainId = walletClient.chain.id;
  const endpointAddr = context.contracts.endpoint;

  const client = new IndexerClient({
    url: context.endpoints.indexer,
    walletClient,
  });

  const subaccount: Subaccount = {
    subaccountName: 'default',
    subaccountOwner: walletClient.account.address,
  };

  if (
    context.env.chainEnv === 'blastTestnet' ||
    context.env.chainEnv === 'blast'
  ) {
    const blastPoints = await client.getBlastPoints({
      address: subaccount.subaccountOwner,
    });
    const blitzPoints = await client.getBlitzPoints({
      address: subaccount.subaccountOwner,
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

  const leaderboard = await client.getLeaderboard({
    limit: 5,
    startCursor: undefined,
    contestId: 8,
    rankType: 'pnl',
  });

  prettyPrint('Leaderboard', leaderboard);

  const leaderboardParticipant = await client.getLeaderboardParticipant({
    subaccount: {
      subaccountName: subaccount.subaccountName,
      subaccountOwner: subaccount.subaccountOwner,
    },
    contestIds: [5, 6, 7],
  });

  prettyPrint('Leaderboard Participant', leaderboardParticipant);

  const leaderboardContests = await client.getLeaderboardContests({
    contestIds: [1],
  });

  prettyPrint('Leaderboard Contests', leaderboardContests);

  const leaderboardFirstPage = await client.getPaginatedLeaderboard({
    rankType: 'roi',
    startCursor: undefined,
    contestId: 1,
    limit: 5,
  });

  prettyPrint('Leaderboard First Page', leaderboardFirstPage);

  if (leaderboardFirstPage.meta.hasMore) {
    const leaderboardSecondPage = await client.getPaginatedLeaderboard({
      rankType: 'roi',
      startCursor: leaderboardFirstPage.meta.nextCursor,
      contestId: 1,
      limit: 5,
    });

    prettyPrint('Leaderboard Second Page', leaderboardSecondPage);
  }

  try {
    const updateLeaderboardRegistrationResult =
      await client.updateLeaderboardRegistration({
        contestId: 17,
        subaccountName: subaccount.subaccountName,
        subaccountOwner: subaccount.subaccountOwner,
        updateRegistration: {
          verifyingAddr: endpointAddr,
          chainId,
        },
      });

    prettyPrint(
      'Update leaderboard registration result',
      updateLeaderboardRegistrationResult,
    );
  } catch (e: unknown) {
    console.log(
      'Failed to update leaderboard registration:',
      getServerError(e),
    );
  }

  try {
    const leaderboardRegistrationResult =
      await client.getLeaderboardRegistration({
        contestId: 16,
        subaccountName: subaccount.subaccountName,
        subaccountOwner: subaccount.subaccountOwner,
      });

    prettyPrint(
      'Leaderboard registration result',
      leaderboardRegistrationResult,
    );
  } catch (e: unknown) {
    console.log('Failed to query leaderboard registration:', getServerError(e));
  }
}
