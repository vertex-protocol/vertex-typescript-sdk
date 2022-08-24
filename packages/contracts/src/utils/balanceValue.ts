import { BigDecimal } from '@vertex-protocol/utils';
import { PerpBalanceWithProduct, SpotBalanceWithProduct } from '../common';

/**
 * Calculates the quote value of a spot balance
 *
 * @param balanceWithProduct
 */
export function calcSpotBalanceValue(
  balanceWithProduct: SpotBalanceWithProduct,
): BigDecimal {
  return balanceWithProduct.amount.multipliedBy(balanceWithProduct.oraclePrice);
}

/**
 * Calculates the notional value of a perp balance
 *
 * @param balanceWithProduct
 */
export function calcPerpBalanceNotionalValue(
  balanceWithProduct: PerpBalanceWithProduct,
): BigDecimal {
  return balanceWithProduct.amount.multipliedBy(balanceWithProduct.oraclePrice);
}

/**
 * Calculates the true quote value of a perp balance, which is the same as its pnl
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
