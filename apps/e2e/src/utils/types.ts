import {
  ChainEnv,
  VertexDeploymentAddresses,
  WalletClientWithAccount,
} from '@vertex-protocol/contracts';
import { Hex, PublicClient } from 'viem';

export interface Env {
  chainEnv: ChainEnv;
  privateKey: Hex;
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
