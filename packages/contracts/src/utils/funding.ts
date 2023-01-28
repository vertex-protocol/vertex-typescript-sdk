import { BigDecimal, clampBigDecimal } from '@vertex-protocol/utils';
import { PerpProduct } from '../common';

const MAX_FUNDING_PRICE_DIFF_FRAC = 0.1;

/**
 * Calculates an approximate 24hr % rate for perp funding by extrapolating current price difference between oracle and
 * market EMA. This assumes that the EMA price is updated recently.
 *
 * @param product given by PerpEngine
 */
export function calcApproximate24hrFundingRate(product: PerpProduct) {
  // TODO: update once backend adds funding rate query
  return BigDecimal(0);
  // const { markPrice, oraclePrice } = product;
  // const priceDiff = markPrice.minus(oraclePrice);
  // // Clamp and preserve sign
  // const clampedPriceDiff = clampBigDecimal(priceDiff.abs(), {
  //   max: oraclePrice.multipliedBy(MAX_FUNDING_PRICE_DIFF_FRAC),
  // }).multipliedBy(priceDiff.lt(0) ? -1 : 1);

  // return clampedPriceDiff.div(oraclePrice);
}
