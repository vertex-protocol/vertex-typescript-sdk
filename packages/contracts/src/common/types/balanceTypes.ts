import { PerpProduct, ProductEngineType, SpotProduct } from './productTypes';
import { BigDecimal } from '@vertex-protocol/utils';

export type BalanceSide = 'long' | 'short';

/**
 * Shared properties of a product balance
 */
interface BaseBalance {
  type: ProductEngineType;
  productId: number;
  // Amount for the balance
  amount: BigDecimal;
  // Amount for the LP balance
  lpAmount: BigDecimal;
}

/**
 * Balance for a perp product
 */
export interface PerpBalance extends BaseBalance {
  type: ProductEngineType.PERP;
  /**
   * As there is no "quote" product for the perp engine, this is a representation of the net quote balance
   * associated with the position. The entry cost and funding is rolled into this.
   */
  vQuoteBalance: BigDecimal;
}

export type PerpBalanceWithProduct = PerpBalance & PerpProduct;

/**
 * Balance for a spot product
 */
export interface SpotBalance extends BaseBalance {
  type: ProductEngineType.SPOT;
}

export type SpotBalanceWithProduct = SpotBalance & SpotProduct;

export type Balance = PerpBalance | SpotBalance;
export type BalanceWithProduct =
  | SpotBalanceWithProduct
  | PerpBalanceWithProduct;
