import { CustomNumberFormatSpecifier } from './NumberFormatSpecifier';

/**
 * Applies any post-processing to the output of d3-format
 *
 * @param formatResult output of d3-format
 * @param givenFormatSpecifier The specifier initially requested, not the resolved specifier, as we want to watch for custom specifiers
 */
export function postProcessFormattedNumber(
  formatResult: string,
  givenFormatSpecifier: string,
): string {
  switch (givenFormatSpecifier) {
    // Replace Giga (G) (10^9) with B
    case CustomNumberFormatSpecifier.NUMBER_PRECISE:
      return formatResult.replace('G', 'B');
    case CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED:
      return formatResult.replace('G', 'B');
    case CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED:
      return formatResult.replace('G', 'B');
    default:
      break;
  }
  return formatResult;
}
