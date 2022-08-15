import { BigDecimal } from './bigDecimal';

interface ClampOptions {
  min?: BigDecimal;
  max?: BigDecimal;
}

export function clampBigDecimal(
  val: BigDecimal,
  opts: ClampOptions,
): BigDecimal {
  if (opts.min != null && val.lt(opts.min)) {
    return opts.min;
  } else if (opts.max != null && val.gt(opts.max)) {
    return opts.max;
  }
  return val;
}
