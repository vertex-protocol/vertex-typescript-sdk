import { ChainEnv, VertexClient } from '@vertex-protocol/client';
import { Provider, Wallet } from 'ethers';
import { PrimaryChain } from '../../types';

export interface VertexClientWithMetadata {
  primaryChain: PrimaryChain;
  chainEnv: ChainEnv;
  client: VertexClient;
  provider: Provider;
}

export interface VertexClientSetLinkedSignerParams {
  signer: Wallet | null;
  chainEnv: ChainEnv;
}
