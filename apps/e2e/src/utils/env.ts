import 'dotenv/config';
import { ChainEnv, Env } from './types';

const chainEnv: ChainEnv = (process.env.CHAIN_ENV as ChainEnv) ?? 'testnet';
const privateKey = process.env.PRIVATE_KEY ?? '';

export const env: Env = {
  chainEnv,
  privateKey,
};
