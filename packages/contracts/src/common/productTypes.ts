// Enums do not get reflected in the ABI, so this must be manually defined
import { BigDecimal } from '@vertex/utils';

export enum ProductEngineType {
  SPOT = 0,
  PERP = 1,
}

interface BaseProduct {
  productId: number;
  oraclePrice: BigDecimal;
  longWeightInitial: BigDecimal;
  shortWeightInitial: BigDecimal;
  longWeightMaintenance: BigDecimal;
  shortWeightMaintenance: BigDecimal;
}

export interface PerpProduct extends BaseProduct {
  type: 'perp';
  // TODO: funding stuff
}

export interface SpotProduct extends BaseProduct {
  type: 'spot';
  interestFloor: BigDecimal;
  interestInflectionUtil: BigDecimal;
  interestSmallCap: BigDecimal;
  interestLargeCap: BigDecimal;

  totalDeposited: BigDecimal;
  totalBorrowed: BigDecimal;
}

export type Product = PerpProduct | SpotProduct;
export type ProductType = Product['type'];
