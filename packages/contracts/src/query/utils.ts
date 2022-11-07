import { FQuerier } from '../typechain-types';
import { PerpProduct, ProductEngineType, SpotProduct } from '../common';
import { fromX18 } from '@vertex-protocol/utils';
import { calcTotalBorrowed, calcTotalDeposited } from '../utils';

export function mapEngineSpotProduct(
  product: FQuerier.SpotProductStructOutput,
): SpotProduct {
  return {
    productId: product.productId,
    type: ProductEngineType.SPOT,
    tokenAddr: product.config.token,
    interestSmallCap: fromX18(product.config.interestSmallCapX18),
    interestLargeCap: fromX18(product.config.interestLargeCapX18),
    interestFloor: fromX18(product.config.interestFloorX18),
    interestInflectionUtil: fromX18(product.config.interestInflectionUtilX18),
    totalBorrowed: calcTotalBorrowed(
      product.state.totalBorrowsNormalizedX18,
      product.state.cumulativeBorrowsMultiplierX18,
    ),
    totalDeposited: calcTotalDeposited(
      product.state.totalDepositsNormalizedX18,
      product.state.cumulativeDepositsMultiplierX18,
    ),
    shortWeightInitial: fromX18(product.risk.shortWeightInitialX18),
    shortWeightMaintenance: fromX18(product.risk.shortWeightMaintenanceX18),
    longWeightInitial: fromX18(product.risk.longWeightInitialX18),
    longWeightMaintenance: fromX18(product.risk.longWeightMaintenanceX18),
    largePositionPenalty: fromX18(product.risk.largePositionPenaltyX18),
    oraclePrice: fromX18(product.oraclePriceX18),
  };
}

export function mapEnginePerpProduct(
  product: FQuerier.PerpProductStructOutput,
): PerpProduct {
  return {
    productId: product.productId,
    type: ProductEngineType.PERP,
    shortWeightInitial: fromX18(product.risk.shortWeightInitialX18),
    shortWeightMaintenance: fromX18(product.risk.shortWeightMaintenanceX18),
    longWeightInitial: fromX18(product.risk.longWeightInitialX18),
    longWeightMaintenance: fromX18(product.risk.longWeightMaintenanceX18),
    largePositionPenalty: fromX18(product.risk.largePositionPenaltyX18),
    oraclePrice: fromX18(product.oraclePriceX18),
    markPrice: fromX18(product.markPriceX18),
    openInterest: fromX18(product.state.openInterestX18),
  };
}
