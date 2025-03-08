import 'dotenv/config';
import { ChainEnv } from '@vertex-protocol/contracts';
import { getValidatedHex } from '@vertex-protocol/utils';
import { Env } from './types';

const chainEnv: ChainEnv =
  (process.env.CHAIN_ENV as ChainEnv) ?? 'arbitrumTestnet';
const privateKey = getValidatedHex(process.env.PRIVATE_KEY ?? '');

export const env: Env = {
  chainEnv,
  privateKey,
};
