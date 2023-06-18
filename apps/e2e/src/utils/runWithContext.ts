import { RunContext, RunFn } from './types';
import { getProvider } from './getProvider';
import { env } from './env';
import { Wallet } from 'ethers';
import { ENGINE_CLIENT_ENDPOINTS } from '@vertex-protocol/engine-client';
import { INDEXER_CLIENT_ENDPOINTS } from '@vertex-protocol/indexer-client/dist/endpoints';
import { VERTEX_DEPLOYMENTS } from '@vertex-protocol/contracts';

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
    },
    contracts: VERTEX_DEPLOYMENTS[env.chainEnv],
  };

  runFn(context);
}
