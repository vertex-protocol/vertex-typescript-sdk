import { runWithContext } from '../utils/runWithContext';
import { collateralTests } from './collateralTests';
import { orderTests } from './orderTests';
import { queryTests } from './queryTests';
import { wsMessageTests } from './wsMessageTests';

async function fullSanity() {
  await runWithContext(collateralTests);
  await runWithContext(orderTests);
  await runWithContext(queryTests);
  await runWithContext(wsMessageTests);
}

void fullSanity();
