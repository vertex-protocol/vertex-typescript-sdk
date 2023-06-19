import { TypedDataSigner } from '@ethersproject/abstract-signer';
import { Signer } from 'ethers';

export type ValidVertexSigner = TypedDataSigner & Signer;
