import { runWithContext } from '../utils/runWithContext';
import { collateralTests } from './collateralTests';
import { lpTests } from './lpTests';
import { queryTests } from './queryTests';
import { signerAndOrderTests } from './signerAndOrderTests';
import { vlpTests } from './vlpTests';

async function allTests() {
  console.log('Running query tests');
  await runWithContext(queryTests);

  console.log('Running collateral tests');
  await runWithContext(collateralTests);

  console.log('Running order tests');
  await runWithContext(signerAndOrderTests);

  console.log('Running LP tests');
  await runWithContext(lpTests);

  console.log('Running VLP tests');
  await runWithContext(vlpTests);
}

void allTests();
