import { RunContext, RunFn } from './types';
import { getProvider } from './getProvider';
import { env } from './env';
import { Wallet } from 'ethers';
import { ENGINE_CLIENT_ENDPOINTS } from '@vertex-protocol/engine-client';
import { INDEXER_CLIENT_ENDPOINTS } from '@vertex-protocol/indexer-client';
import { VERTEX_DEPLOYMENTS } from '@vertex-protocol/contracts';
import { TRIGGER_CLIENT_ENDPOINTS } from '@vertex-protocol/trigger-client';

export function runWithContext(runFn: RunFn) {
  const provider = getProvider(env.chainEnv);
  const getWallet = () => {
    if (!env.privateKey) {
      throw new Error('No private key found. Please check .env');
    }
    return new Wallet(env.privateKey, provider);
  };

  const context: RunContext = {
    provider,
    env,
    getWallet,
    endpoints: {
      engine: ENGINE_CLIENT_ENDPOINTS[env.chainEnv],
      indexer: INDEXER_CLIENT_ENDPOINTS[env.chainEnv],
      trigger: TRIGGER_CLIENT_ENDPOINTS[env.chainEnv],
    },
    contracts: VERTEX_DEPLOYMENTS[env.chainEnv],
  };

  try {
    const result = runFn(context);
    if (result instanceof Promise) {
      result.catch((err) => {
        console.error('Error running test:', err);
      });
    }
  } catch (err) {
    console.error('Error running test:', err);
  }
}
