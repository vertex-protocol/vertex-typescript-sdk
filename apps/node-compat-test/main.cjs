const { createClientContext } = require('@vertex-protocol/client');

if (typeof createClientContext !== 'function') {
  throw new Error('unexpected import');
}

console.log('Successfully loaded @vertex-protocol/client in CJS');
