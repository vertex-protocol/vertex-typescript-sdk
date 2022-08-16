import {
  PerpProduct,
  Product,
  ProductEngineType,
  SpotProduct,
} from '../common';

// Utility for Typescript for filtering by spot product
export function isSpotProduct(product: Product): product is SpotProduct {
  return product.type === ProductEngineType.SPOT;
}

// Utility for Typescript for filtering by perp product
export function isPerpProduct(product: Product): product is PerpProduct {
  return product.type === ProductEngineType.PERP;
}
