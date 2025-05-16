import { collateralTests } from '../client/collateralTests';
import { runWithContext } from '../utils/runWithContext';
import { signerAndOrderTests } from './signerAndOrderTests';
import { lpTests } from './lpTests';
import { vlpTests } from './vlpTests';
import { queryTests } from './queryTests';

async function fullSanity() {
  await runWithContext(collateralTests);
  await runWithContext(queryTests);
  await runWithContext(signerAndOrderTests);
  await runWithContext(lpTests);
  await runWithContext(vlpTests);
}

void fullSanity();
