import { BigDecimal } from '@vertex-protocol/utils';
import { precisionFixed } from 'd3-format';
import { PresetNumberFormatSpecifier } from './NumberFormatSpecifier';

// This results in a minimum 2dp in displayed price
// If increment is 1, then we show 2dp
// If increment is 0.0001, then we show 4dp
export function getMarketPriceFormatSpecifier(priceIncrement?: BigDecimal) {
  // Price increments should never be zero, so this allows us to use an easy default (BigDecimals.ZERO) when we don't have data
  if (!priceIncrement || priceIncrement.isZero() || priceIncrement.gt(0.01)) {
    return PresetNumberFormatSpecifier.NUMBER_2DP;
  }
  return `.${precisionFixed(priceIncrement.toNumber()).toFixed()}f`;
}
