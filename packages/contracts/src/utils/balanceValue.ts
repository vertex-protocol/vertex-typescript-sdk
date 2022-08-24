import { BigDecimal } from '@vertex-protocol/utils';
import { PerpBalanceWithProduct, SpotBalanceWithProduct } from '../common';

export function calcSpotBalanceValue(
  balanceWithProduct: SpotBalanceWithProduct,
): BigDecimal {
  return balanceWithProduct.amount.multipliedBy(balanceWithProduct.oraclePrice);
}

export function calcPerpBalanceNotionalValue(
  balanceWithProduct: PerpBalanceWithProduct,
): BigDecimal {
  return balanceWithProduct.amount.multipliedBy(balanceWithProduct.oraclePrice);
}

export function calcPerpBalanceValue(
  balanceWithProduct: PerpBalanceWithProduct,
): BigDecimal {
  return balanceWithProduct.amount
    .multipliedBy(balanceWithProduct.oraclePrice)
    .plus(balanceWithProduct.vQuoteBalance);
}
