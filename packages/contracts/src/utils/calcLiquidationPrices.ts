import { BigDecimal } from '@vertex-protocol/utils';
import { Product } from '../common';

interface LiquidationPrices {
  long: BigDecimal;
  short: BigDecimal;
}

/**
 * Calculates the liquidation prices for a given product
 *
 */
export function calcLiquidationPrices(product: Product): LiquidationPrices {
  const { oraclePrice, longWeightMaintenance, shortWeightMaintenance } =
    product;

  return {
    long: oraclePrice.multipliedBy(longWeightMaintenance.plus(1)).div(2),
    short: oraclePrice.multipliedBy(shortWeightMaintenance.plus(1)).div(2),
  };
}
