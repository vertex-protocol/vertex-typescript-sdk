import { IPerpEngine } from '../typechain-types';
import { clampBigDecimal, fromX18 } from '@vertex-protocol/utils';

const MAX_FUNDING_PRICE_DIFF_FRAC = 0.1;

export function calcApproximate24hrFundingRate(
  product: IPerpEngine.ProductStructOutput,
) {
  const { ammPriceX18, priceX18 } = product.state;
  const oraclePrice = fromX18(priceX18);
  const priceDiff = fromX18(ammPriceX18).minus(oraclePrice);
  // Clamp and preserve sign
  const clampedPriceDiff = clampBigDecimal(priceDiff.abs(), {
    max: oraclePrice.multipliedBy(MAX_FUNDING_PRICE_DIFF_FRAC),
  }).multipliedBy(priceDiff.lt(0) ? -1 : 1);

  return clampedPriceDiff.div(oraclePrice);
}
