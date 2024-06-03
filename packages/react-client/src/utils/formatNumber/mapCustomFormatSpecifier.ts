import { BigDecimal } from '@vertex-protocol/utils';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from './NumberFormatSpecifier';

// If a custom specifier is used, map it to a d3 format specifier
export function mapCustomFormatSpecifier(
  value: BigDecimal,
  formatSpecifier: string,
): string | undefined {
  const absValue = value.abs();
  const valueSizeClass = getValueSizeClass(absValue);
  const isLargeSizeClassOrGreater =
    valueSizeClass === 'lg' || valueSizeClass === 'xl';
  // For signed variants, we don't want to show a sign if the value is zero
  const isZero = absValue.isZero();

  switch (formatSpecifier) {
    case CustomNumberFormatSpecifier.NUMBER_PRECISE:
      switch (valueSizeClass) {
        case 'xl':
          return PresetNumberFormatSpecifier.NUMBER_SI_5SF;
        case 'lg':
        case 'md':
          // For all "reasonable numbers", show 4dp
          return PresetNumberFormatSpecifier.NUMBER_4DP;
        case 'sm':
        case 'xs':
          // For small numbers, show more precision, but ignore super tiny numbers beyond 6dp
          return PresetNumberFormatSpecifier.NUMBER_UPTO_6DP;
      }
      break;

    case CustomNumberFormatSpecifier.NUMBER_AUTO:
      if (isLargeSizeClassOrGreater) {
        return PresetNumberFormatSpecifier.NUMBER_2DP;
      }
      return PresetNumberFormatSpecifier.NUMBER_4DP;

    case CustomNumberFormatSpecifier.SIGNED_NUMBER_AUTO:
      if (isZero) {
        return PresetNumberFormatSpecifier.NUMBER_2DP;
      }
      return isLargeSizeClassOrGreater
        ? PresetNumberFormatSpecifier.SIGNED_NUMBER_2DP
        : PresetNumberFormatSpecifier.SIGNED_NUMBER_4DP;

    case CustomNumberFormatSpecifier.SIGNED_CURRENCY_2DP:
      if (isZero) {
        return PresetNumberFormatSpecifier.CURRENCY_2DP;
      }
      return PresetNumberFormatSpecifier.SIGNED_CURRENCY_2DP;

    case CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED:
      if (isLargeSizeClassOrGreater) {
        return PresetNumberFormatSpecifier.NUMBER_SI_3SF;
      }
      return PresetNumberFormatSpecifier.NUMBER_INT;

    case CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED:
      if (isLargeSizeClassOrGreater) {
        return PresetNumberFormatSpecifier.CURRENCY_SI_3SF;
      }
      return PresetNumberFormatSpecifier.CURRENCY_2DP;
  }
}

// General value-dependent guidelines for numbers
function getValueSizeClass(
  absValue: BigDecimal,
): 'xl' | 'lg' | 'md' | 'sm' | 'xs' {
  if (absValue.gt(1e7)) {
    return 'xl';
  }
  if (absValue.gt(1e4)) {
    return 'lg';
  }
  if (absValue.gt(1e-4)) {
    return 'md';
  }
  if (absValue.gt(1e-6)) {
    return 'sm';
  }
  return 'xs';
}
