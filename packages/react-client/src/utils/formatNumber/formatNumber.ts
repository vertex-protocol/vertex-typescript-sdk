import { toBigDecimal } from '@vertex-protocol/utils';
import { format as d3Format } from 'd3-format';
import { mapCustomFormatSpecifier } from './mapCustomFormatSpecifier';
import { postProcessFormattedNumber } from './postProcessFormattedNumber';
import { NumberFormatOptions, NumberFormatValue } from './types';

export function formatNumber(
  val: NumberFormatValue | undefined,
  options?: NumberFormatOptions,
): string {
  const { defaultValue, defaultFallback, formatSpecifier } = options ?? {};

  if (defaultValue == null && val == null) {
    return defaultFallback ?? '-';
  }

  const givenFormatSpecifier = formatSpecifier ?? ',~g';

  const valueToFormat = toBigDecimal(val ?? defaultValue ?? 0);
  const mappedCustomSpecifier = mapCustomFormatSpecifier(
    valueToFormat,
    givenFormatSpecifier,
  );
  const resolvedFormatSpecifier = mappedCustomSpecifier ?? givenFormatSpecifier;

  const formatted = d3Format(resolvedFormatSpecifier)(valueToFormat.toNumber());

  return postProcessFormattedNumber(formatted, givenFormatSpecifier);
}
