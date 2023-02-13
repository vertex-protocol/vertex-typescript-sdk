import { Bytes } from 'ethers/lib/utils';

export type SubaccountBytes32 = Bytes;

export type SubaccountNameBytes12 = Bytes;

export interface Subaccount {
  subaccountOwner: string;
  subaccountName: string;
}
