import { PerpProduct, ProductEngineType, SpotProduct } from './productTypes';
import { BigDecimal } from '@vertex-protocol/utils';

/**
 * Shared properties of a market
 */
export interface Market {
  productId: number;
  type: ProductEngineType;
  // Latest orderbook mark price
  markPrice: BigDecimal;
  // Price increment for the orderbook, order prices must be placed at multiples of this increment
  priceIncrement: BigDecimal;
  // Size increment for the orderbook, order sizes must be placed at multiples of this increment
  sizeIncrement: BigDecimal;
}

/**
 * Perp market with perp producti nfo
 */
export interface PerpMarket extends Market {
  type: ProductEngineType.PERP;
  product: Omit<PerpProduct, 'productId'>;
}

/**
 * Spot market with spot product info
 */
export interface SpotMarket extends Market {
  type: ProductEngineType.SPOT;
  product: Omit<SpotProduct, 'productId'>;
}

export type MarketWithProduct = PerpMarket | SpotMarket;
