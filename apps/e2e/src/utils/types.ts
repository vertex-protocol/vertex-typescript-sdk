import { Provider } from '@ethersproject/providers';
import { Wallet } from 'ethers';
import { VertexDeploymentAddresses } from '@vertex-protocol/contracts';

export type ChainEnv = 'local' | 'testnet' | 'mainnet';

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
    indexer: string;
  };
  contracts: VertexDeploymentAddresses;

  // Throws on invalid / non-existent private key
  getWallet(): Wallet;
}

export type RunFn = (ctx: RunContext) => Promise<void> | void;
