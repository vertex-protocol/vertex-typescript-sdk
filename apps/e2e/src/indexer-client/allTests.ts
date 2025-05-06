import { runWithContext } from '../utils/runWithContext';
import { leaderboardTests } from './leaderboardTests';
import { marketQueriesTests } from './marketQueriesTests';
import { subaccountQueriesTests } from './subaccountQueriesTests';

async function allTests() {
  console.log('Running subaccount queries tests');
  await runWithContext(subaccountQueriesTests);

  console.log('Running market queries tests');
  await runWithContext(marketQueriesTests);

  console.log('Runiing leaderboard tests');
  await runWithContext(leaderboardTests);
}

void allTests();
