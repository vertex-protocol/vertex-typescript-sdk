import 'dotenv/config';
import { ChainEnv } from '@vertex-protocol/contracts';
import { Env } from './types';

const chainEnv: ChainEnv =
  (process.env.CHAIN_ENV as ChainEnv) ?? 'arbitrumTestnet';
const privateKey = process.env.PRIVATE_KEY ?? '';

export const env: Env = {
  chainEnv,
  privateKey,
};
