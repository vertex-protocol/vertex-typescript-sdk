import 'dotenv/config';
import { ChainEnv } from '@vertex-protocol/contracts';
import { Hex } from 'viem';
import { Env } from './types';

const chainEnv: ChainEnv =
  (process.env.CHAIN_ENV as ChainEnv) ?? 'arbitrumTestnet';
const privateKey = process.env.PRIVATE_KEY as Hex;

export const env: Env = {
  chainEnv,
  privateKey,
};
