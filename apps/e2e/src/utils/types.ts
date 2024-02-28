import {
  ChainEnv,
  VertexDeploymentAddresses,
} from '@vertex-protocol/contracts';
import { Provider, Wallet } from 'ethers';

export interface Env {
  chainEnv: ChainEnv;
  privateKey: string;
}

export interface RunContext {
  env: Env;
  // For the configured chain env
  provider: Provider;
  endpoints: {
    engine: string;
    trigger: string;
    indexer: string;
  };
  contracts: VertexDeploymentAddresses;

  // Throws on invalid / non-existent private key
  getWallet(): Wallet;
}

export type RunFn = (ctx: RunContext) => Promise<void> | void;
