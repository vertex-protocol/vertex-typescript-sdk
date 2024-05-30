import { BigDecimalish } from '@vertex-protocol/utils';
import { NumberFormatSpecifier } from './NumberFormatSpecifier';

export type NumberFormatValue = BigDecimalish;

export interface NumberFormatOptions {
  // The format specifier to use, see https://github.com/d3/d3-format
  formatSpecifier?: NumberFormatSpecifier | string;
  // What to render if the value given is null, has precedence over `defaultValue`
  defaultFallback?: string;
  // If the value is undefined, default to formatting this value
  defaultValue?: NumberFormatValue;
}
