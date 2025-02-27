import {
  ChainEnv,
  VertexDeploymentAddresses,
  WalletClientWithAccount,
} from '@vertex-protocol/contracts';
import { PublicClient } from 'viem';

export interface Env {
  chainEnv: ChainEnv;
  privateKey: string;
}

export interface RunContext {
  env: Env;
  publicClient: PublicClient;
  endpoints: {
    engine: string;
    trigger: string;
    indexer: string;
  };
  contracts: VertexDeploymentAddresses;

  // Throws on invalid / non-existent private key
  getWalletClient(): WalletClientWithAccount;
}

export type RunFn = (ctx: RunContext) => Promise<void> | void;
