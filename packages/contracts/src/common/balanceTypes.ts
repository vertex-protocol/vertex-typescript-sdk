import { PerpProduct, ProductType, SpotProduct } from './productTypes';
import { BigDecimal } from '@vertex/utils';

interface BaseBalance {
  type: ProductType;
  productId: number;
  amount: BigDecimal;
}

export interface PerpBalance extends BaseBalance {
  type: 'perp';
  vQuoteBalance: BigDecimal;
}

export type PerpBalanceWithProduct = PerpBalance & PerpProduct;

export interface SpotBalance extends BaseBalance {
  type: 'spot';
}

export type SpotBalanceWithProduct = SpotBalance & SpotProduct;

export type Balance = PerpBalance | SpotBalance;
export type BalanceWithProduct =
  | SpotBalanceWithProduct
  | PerpBalanceWithProduct;
