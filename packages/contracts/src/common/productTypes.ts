// Enums do not get reflected in the ABI, so this must be manually defined
import { BigDecimal } from '@vertex/utils';

export enum ProductEngineType {
  SPOT = 0,
  PERP = 1,
}

export function toProductEngineType(val: number): ProductEngineType {
  switch (val) {
    case 0:
      return ProductEngineType.SPOT;
    case 1:
      return ProductEngineType.PERP;
    default:
      throw new Error(`Unknown product engine type: ${val}`);
  }
}

interface BaseProduct {
  type: ProductEngineType;
  productId: number;
  oraclePrice: BigDecimal;
  longWeightInitial: BigDecimal;
  shortWeightInitial: BigDecimal;
  longWeightMaintenance: BigDecimal;
  shortWeightMaintenance: BigDecimal;
}

export interface PerpProduct extends BaseProduct {
  type: ProductEngineType.PERP;
  // TODO: funding stuff
}

export interface SpotProduct extends BaseProduct {
  type: ProductEngineType.SPOT;
  interestFloor: BigDecimal;
  interestInflectionUtil: BigDecimal;
  interestSmallCap: BigDecimal;
  interestLargeCap: BigDecimal;

  totalDeposited: BigDecimal;
  totalBorrowed: BigDecimal;
}

export type Product = PerpProduct | SpotProduct;
export type ProductType = Product['type'];
