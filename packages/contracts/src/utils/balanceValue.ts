import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import {
  BalanceWithProduct,
  PerpBalanceWithProduct,
  Product,
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
 */
export function calcLpBalanceValue(
  balanceWithProduct: BalanceWithProduct,
): BigDecimal {
  const lpBalance = balanceWithProduct.lpAmount;
  if (lpBalance.isZero()) {
    return toBigDecimal(0);
  }

  return calcLpTokenValue(balanceWithProduct).times(lpBalance);
}

/**
 * Calculates the implied value of an LP token, in terms of quote units
 *
 * @param product
 */
export function calcLpTokenValue(product: Product) {
  if (product.totalLpSupply.isZero()) {
    return toBigDecimal(0);
  }
  const baseValue = product.totalLpBaseAmount
    .div(product.totalLpSupply)
    .multipliedBy(product.oraclePrice);
  const quoteValue = product.totalLpQuoteAmount.div(product.totalLpSupply);
  return baseValue.plus(quoteValue);
}
