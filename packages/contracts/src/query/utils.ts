import { removeDecimals, toBigDecimal } from '@vertex-protocol/utils';
import { ReadContractReturnType } from 'viem';
import {
  BalanceHealthContributions,
  PerpProduct,
  ProductEngineType,
  SpotProduct,
  VertexAbis,
} from '../common';
import { calcTotalBorrowed, calcTotalDeposited } from '../utils';

type GetAllProductsResponse = ReadContractReturnType<
  VertexAbis['querier'],
  'getAllProducts'
>;

export function mapContractSpotProduct(
  product: GetAllProductsResponse['spotProducts'][number],
): SpotProduct {
  return {
    productId: Number(product.productId),
    type: ProductEngineType.SPOT,
    tokenAddr: product.config.token,
    interestSmallCap: removeDecimals(
      toBigDecimal(product.config.interestSmallCapX18),
    ),
    interestLargeCap: removeDecimals(
      toBigDecimal(product.config.interestLargeCapX18),
    ),
    interestFloor: removeDecimals(
      toBigDecimal(product.config.interestFloorX18),
    ),
    interestInflectionUtil: removeDecimals(
      toBigDecimal(product.config.interestInflectionUtilX18),
    ),
    totalBorrowed: calcTotalBorrowed(
      product.state.totalBorrowsNormalized,
      product.state.cumulativeBorrowsMultiplierX18,
    ),
    totalDeposited: calcTotalDeposited(
      product.state.totalDepositsNormalized,
      product.state.cumulativeDepositsMultiplierX18,
    ),
    shortWeightInitial: removeDecimals(
      toBigDecimal(product.risk.shortWeightInitialX18),
    ),
    shortWeightMaintenance: removeDecimals(
      toBigDecimal(product.risk.shortWeightMaintenanceX18),
    ),
    longWeightInitial: removeDecimals(
      toBigDecimal(product.risk.longWeightInitialX18),
    ),
    longWeightMaintenance: removeDecimals(
      toBigDecimal(product.risk.longWeightMaintenanceX18),
    ),
    oraclePrice: removeDecimals(toBigDecimal(product.oraclePriceX18)),
    totalLpBaseAmount: toBigDecimal(product.lpState.base.amount),
    totalLpQuoteAmount: toBigDecimal(product.lpState.quote.amount),
    totalLpSupply: toBigDecimal(product.lpState.supply),
  };
}

export function mapContractPerpProduct(
  product: GetAllProductsResponse['perpProducts'][number],
): PerpProduct {
  return {
    productId: Number(product.productId),
    type: ProductEngineType.PERP,
    shortWeightInitial: removeDecimals(
      toBigDecimal(product.risk.shortWeightInitialX18),
    ),
    shortWeightMaintenance: removeDecimals(
      toBigDecimal(product.risk.shortWeightMaintenanceX18),
    ),
    longWeightInitial: removeDecimals(
      toBigDecimal(product.risk.longWeightInitialX18),
    ),
    longWeightMaintenance: removeDecimals(
      toBigDecimal(product.risk.longWeightMaintenanceX18),
    ),
    cumulativeFundingLong: removeDecimals(
      toBigDecimal(product.state.cumulativeFundingLongX18),
    ),
    cumulativeFundingShort: removeDecimals(
      toBigDecimal(product.state.cumulativeFundingShortX18),
    ),
    oraclePrice: removeDecimals(toBigDecimal(product.oraclePriceX18)),
    openInterest: toBigDecimal(product.state.openInterest),
    totalLpBaseAmount: toBigDecimal(product.lpState.base),
    totalLpQuoteAmount: toBigDecimal(product.lpState.quote),
    totalLpSupply: toBigDecimal(product.lpState.supply),
  };
}

export function mapHealthContributions(
  contributionsForProduct: readonly bigint[],
): BalanceHealthContributions {
  // Initial, maint, unweighted
  return {
    initial: toBigDecimal(contributionsForProduct[0]),
    maintenance: toBigDecimal(contributionsForProduct[1]),
    unweighted: toBigDecimal(contributionsForProduct[2]),
  };
}
