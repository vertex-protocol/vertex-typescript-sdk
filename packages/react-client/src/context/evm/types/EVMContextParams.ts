import { ChainEnv } from '@vertex-protocol/client';
import { WagmiConfigParams } from './WagmiConfigParams';

export interface EVMContextParams extends WagmiConfigParams {
  supportedChainEnvs: ChainEnv[];
}
