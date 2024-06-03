import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from './NumberFormatSpecifier';

/**
 * Returns the appropriate format specifier for displaying quote currency amounts for a market
 * @param isPrimaryQuote
 * @param isSigned
 */
export function getMarketQuoteSizeFormatSpecifier(
  isPrimaryQuote: boolean | undefined,
  isSigned = false,
) {
  // Primary quote is typically USDC, so we only show 2dp
  if (isSigned) {
    return isPrimaryQuote
      ? PresetNumberFormatSpecifier.SIGNED_NUMBER_2DP
      : CustomNumberFormatSpecifier.SIGNED_NUMBER_AUTO;
  }

  return isPrimaryQuote
    ? PresetNumberFormatSpecifier.NUMBER_2DP
    : CustomNumberFormatSpecifier.NUMBER_AUTO;
}
