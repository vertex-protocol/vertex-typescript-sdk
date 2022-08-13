import { PerpProduct, ProductEngineType, SpotProduct } from './productTypes';
import { BigDecimal } from '@vertex/utils';

export interface Market {
  productId: number;
  type: ProductEngineType;
  bid: BigDecimal;
  ask: BigDecimal;
  priceIncrement: BigDecimal;
  sizeIncrement: BigDecimal;
}

export interface PerpMarket extends Market {
  type: ProductEngineType.PERP;
  product: Omit<PerpProduct, 'productId'>;
}

export interface SpotMarket extends Market {
  type: ProductEngineType.SPOT;
  product: Omit<SpotProduct, 'productId'>;
}

export type MarketWithProduct = PerpMarket | SpotMarket;
