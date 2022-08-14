import {
  PerpProduct,
  Product,
  ProductEngineType,
  SpotProduct,
} from '../common';

export function isSpotProduct(product: Product): product is SpotProduct {
  return product.type === ProductEngineType.SPOT;
}

export function isPerpProduct(product: Product): product is PerpProduct {
  return product.type === ProductEngineType.PERP;
}
