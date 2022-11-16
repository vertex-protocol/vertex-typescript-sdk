import { BigDecimal } from '@vertex-protocol/utils';
import {
  BalanceWithProduct,
  PerpBalanceWithProduct,
  SpotBalanceWithProduct,
} from '../common';

/**
 * Calculates the quote value of a spot balance
 *
 * @param balanceWithProduct
 * @param decimals If given, adjusts for token decimals by dividing 10^decimals
 */
export function calcSpotBalanceValue(
  balanceWithProduct: SpotBalanceWithProduct,
  decimals = 0,
): BigDecimal {
  return balanceWithProduct.amount
    .multipliedBy(balanceWithProduct.oraclePrice)
    .div(10 ** decimals);
}

/**
 * Calculates the notional value of a perp balance
 *
 * @param balanceWithProduct
 * @param decimals If given, adjusts for token decimals by dividing 10^decimals
 */
export function calcPerpBalanceNotionalValue(
  balanceWithProduct: PerpBalanceWithProduct,
  decimals = 0,
): BigDecimal {
  return balanceWithProduct.amount
    .multipliedBy(balanceWithProduct.oraclePrice)
    .abs()
    .div(10 ** decimals);
}

/**
 * Calculates the true quote value of a perp balance, which is the same as its pnl
 *
 * @param balanceWithProduct
 * @param decimals If given, adjusts for token decimals by dividing 10^decimals
 */
export function calcPerpBalanceValue(
  balanceWithProduct: PerpBalanceWithProduct,
  decimals = 0,
): BigDecimal {
  return balanceWithProduct.amount
    .multipliedBy(balanceWithProduct.oraclePrice)
    .plus(balanceWithProduct.vQuoteBalance)
    .div(10 ** decimals);
}

/**
 * Calculates the implied value of an LP balance
 *
 * @param balanceWithProduct
 * @param decimals
 * @param quoteDecimals
 */
export function calcLpBalanceValue(
  balanceWithProduct: BalanceWithProduct,
  decimals = 0,
  quoteDecimals = 0,
): BigDecimal {
  const lpBalance = balanceWithProduct.lpAmount;

  const impliedBaseBalance = balanceWithProduct.totalLpBaseAmount
    .div(balanceWithProduct.totalLpSupply)
    .multipliedBy(lpBalance);
  const impliedBaseValue = impliedBaseBalance
    .multipliedBy(balanceWithProduct.oraclePrice)
    .div(10 ** decimals);

  const impliedQuoteBalance = balanceWithProduct.totalLpQuoteAmount
    .div(balanceWithProduct.totalLpSupply)
    .multipliedBy(lpBalance);
  const impliedQuoteValue = impliedQuoteBalance.div(10 ** quoteDecimals);

  return impliedBaseValue.plus(impliedQuoteValue);
}
