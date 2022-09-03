import { IPerpEngine, ISpotEngine, IVertexQuerier } from '../typechain-types';
import {
  Market,
  PerpProduct,
  ProductEngineType,
  SpotProduct,
  toProductEngineType,
} from '../common';
import { fromX18 } from '@vertex-protocol/utils';
import { calcTotalBorrowed, calcTotalDeposited } from '../utils';

export function mapEngineSpotProduct(
  product: ISpotEngine.ProductStructOutput,
): Omit<SpotProduct, 'productId'> {
  return {
    type: ProductEngineType.SPOT,
    tokenAddr: product.config.token,
    interestSmallCap: fromX18(product.config.interestSmallCapX18),
    interestLargeCap: fromX18(product.config.interestLargeCapX18),
    interestFloor: fromX18(product.config.interestFloorX18),
    interestInflectionUtil: fromX18(product.config.interestInflectionUtilX18),
    totalBorrowed: calcTotalBorrowed(product.state),
    totalDeposited: calcTotalDeposited(product.state),
    shortWeightInitial: fromX18(product.config.shortWeightInitialX18),
    shortWeightMaintenance: fromX18(product.config.shortWeightMaintenanceX18),
    longWeightInitial: fromX18(product.config.longWeightInitialX18),
    longWeightMaintenance: fromX18(product.config.longWeightMaintenanceX18),
    oraclePrice: fromX18(product.state.priceX18),
    contractProduct: product,
  };
}

export function mapEnginePerpProduct(
  product: IPerpEngine.ProductStructOutput,
): Omit<PerpProduct, 'productId'> {
  return {
    type: ProductEngineType.PERP,
    shortWeightInitial: fromX18(product.config.shortWeightInitialX18),
    shortWeightMaintenance: fromX18(product.config.shortWeightMaintenanceX18),
    longWeightInitial: fromX18(product.config.longWeightInitialX18),
    longWeightMaintenance: fromX18(product.config.longWeightMaintenanceX18),
    oraclePrice: fromX18(product.state.priceX18),
    emaPrice: fromX18(product.state.emaPriceX18),
    contractProduct: product,
  };
}

export function mapQuerierMarket(
  market: IVertexQuerier.MarketInfoStructOutput,
): Omit<Market, 'productId'> {
  return {
    markPrice: fromX18(market.markPriceX18),
    priceIncrement: fromX18(market.priceIncrementX18),
    sizeIncrement: fromX18(market.sizeIncrementX18),
    type: toProductEngineType(market.productType),
  };
}
