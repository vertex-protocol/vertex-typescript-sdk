import { TypedDataSigner } from '@ethersproject/abstract-signer';
import { Signer } from 'ethers';

export interface EngineClientOpts {
  // Server URL
  url: string;
  // Signer for EIP712 signing, if not provided, execute requests will error
  signer?: TypedDataSigner & Signer;
  // Chain ID override for EIP712 signing
  signingChainId?: number;
}

export type WithSequencerAddr<T> = T & {
  sequencerAddr: string;
};

export type ExecuteResultKey = string;
