import { runWithContext } from '../utils/runWithContext';
import { leaderboardTests } from './leaderboardTests';
import { marketsQueriesTests } from './marketsQueriesTests';
import { rewardsQueriesTests } from './rewardsQueriesTests';
import { stakingQueriesTests } from './stakingQueriesTests';
import { subaccountQueriesTests } from './subaccountQueriesTests';
import { vlpQueriesTests } from './vlpQueriesTests';

async function fullSanity() {
  await runWithContext(subaccountQueriesTests);
  await runWithContext(marketsQueriesTests);
  await runWithContext(rewardsQueriesTests);
  await runWithContext(stakingQueriesTests);
  await runWithContext(vlpQueriesTests);
  await runWithContext(leaderboardTests);
}

void fullSanity();
