import { ProductEngineType } from '@vertex-protocol/contracts';
import { ProductEngineServerType } from '../types';

export function mapProductEngineType(
  productEngineType: ProductEngineType,
): ProductEngineServerType {
  switch (productEngineType) {
    case ProductEngineType.SPOT:
      return 'spot';
    case ProductEngineType.PERP:
      return 'perp';
  }
}

export function mapProductEngineServerType(
  productEngineServerType: ProductEngineServerType,
): ProductEngineType {
  switch (productEngineServerType) {
    case 'spot':
      return ProductEngineType.SPOT;
    case 'perp':
      return ProductEngineType.PERP;
  }
}
