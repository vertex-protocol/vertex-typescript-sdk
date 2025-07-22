// this js file is treated as ESM since the package.json has "type": "module"
import { createClientContext } from '@vertex-protocol/client';

if (typeof createClientContext !== 'function') {
  throw new Error('unexpected import');
}

console.log('Successfully loaded @vertex-protocol/client in ESM');
