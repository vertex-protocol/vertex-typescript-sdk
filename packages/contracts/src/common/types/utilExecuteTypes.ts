import { Bytes } from './bytes';

export interface MintMockERC20Params {
  productId: number;
  amount: string;
}

export interface SettlePnlParams {
  subaccounts: Bytes[];
  productIds: number[];
}
