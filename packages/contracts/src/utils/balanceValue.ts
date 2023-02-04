import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import {
  BalanceWithProduct,
  PerpBalanceWithProduct,
  SpotBalanceWithProduct,
} from '../common';

/**
 * Calculates the quote value of a spot balance, in terms of quote units
 *
 * @param balanceWithProduct
 */
export function calcSpotBalanceValue(
  balanceWithProduct: SpotBalanceWithProduct,
): BigDecimal {
  return balanceWithProduct.amount.multipliedBy(balanceWithProduct.oraclePrice);
}

/**
 * Calculates the notional value of a perp balance, in terms of quote units
 *
 * @param balanceWithProduct
 */
export function calcPerpBalanceNotionalValue(
  balanceWithProduct: PerpBalanceWithProduct,
): BigDecimal {
  return balanceWithProduct.amount
    .multipliedBy(balanceWithProduct.oraclePrice)
    .abs();
}

/**
 * Calculates the true quote value of a perp balance, which is the same as its unrealized pnl / unsettled quote, in terms of quote units
 *
 * @param balanceWithProduct
 */
export function calcPerpBalanceValue(
  balanceWithProduct: PerpBalanceWithProduct,
): BigDecimal {
  return balanceWithProduct.amount
    .multipliedBy(balanceWithProduct.oraclePrice)
    .plus(balanceWithProduct.vQuoteBalance);
}

/**
 * Calculates the implied value of an LP balance, in terms of quote units
 *
 * @param balanceWithProduct
 * @param decimals
 * @param quoteDecimals
 */
export function calcLpBalanceValue(
  balanceWithProduct: BalanceWithProduct,
): BigDecimal {
  const lpBalance = balanceWithProduct.lpAmount;
  if (lpBalance.isZero()) {
    return toBigDecimal(0);
  }

  const impliedBaseBalance = balanceWithProduct.totalLpBaseAmount
    .div(balanceWithProduct.totalLpSupply)
    .multipliedBy(lpBalance);
  const impliedBaseValue = impliedBaseBalance.multipliedBy(
    balanceWithProduct.oraclePrice,
  );

  const impliedQuoteBalance = balanceWithProduct.totalLpQuoteAmount
    .div(balanceWithProduct.totalLpSupply)
    .multipliedBy(lpBalance);

  return impliedBaseValue.plus(impliedQuoteBalance);
}
