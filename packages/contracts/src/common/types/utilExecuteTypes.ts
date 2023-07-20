import { BigNumberish } from 'ethers';

import { Bytes } from './bytes';

export interface MintMockERC20Params {
  productId: BigNumberish;
  amount: BigNumberish;
}

export interface SettlePnlParams {
  subaccounts: Bytes[];
  productIds: number[];
}
