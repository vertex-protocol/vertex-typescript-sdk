import { PerpProduct, ProductEngineType, SpotProduct } from './productTypes';
import { BigDecimal } from '@vertex/utils';

interface BaseBalance {
  type: ProductEngineType;
  productId: number;
  amount: BigDecimal;
}

export interface PerpBalance extends BaseBalance {
  type: ProductEngineType.PERP;
  vQuoteBalance: BigDecimal;
}

export type PerpBalanceWithProduct = PerpBalance & PerpProduct;

export interface SpotBalance extends BaseBalance {
  type: ProductEngineType.SPOT;
}

export type SpotBalanceWithProduct = SpotBalance & SpotProduct;

export type Balance = PerpBalance | SpotBalance;
export type BalanceWithProduct =
  | SpotBalanceWithProduct
  | PerpBalanceWithProduct;
