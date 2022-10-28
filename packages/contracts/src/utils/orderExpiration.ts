import { BigNumber, BigNumberish } from 'ethers';

// All valid "special" order expiration types
export type OrderExpirationType = 'default' | 'ioc' | 'fok' | 'post_only';

// 2 MSBs of u64
const EXPIRATION_TYPE_TO_VAL: Record<OrderExpirationType, BigNumber> = {
  default: BigNumber.from('0'),
  // value of 1
  ioc: BigNumber.from('4611686018427387904'),
  // value of 2
  fok: BigNumber.from('9223372036854775808'),
  // value of 3
  post_only: BigNumber.from('13835058055282163712'),
};

/**
 * Special order types, such as immediate-or-cancel, are encoded into the expiration field.
 * This is a utility to create the proper timestamp needed
 */
export function getExpirationTimestamp(
  type: OrderExpirationType,
  expiration = 0,
): BigNumber {
  return EXPIRATION_TYPE_TO_VAL[type].add(expiration);
}

export function parseRawExpirationTimestamp(rawExpiration: BigNumberish): {
  type: OrderExpirationType;
  expiration: BigNumberish;
} {
  // Value of bits 63 and 64
  const maskedExpirationValue = BigNumber.from(rawExpiration).mask(62);
  for (const [expirationType, expirationTypeValue] of Object.entries(
    EXPIRATION_TYPE_TO_VAL,
  )) {
    if (maskedExpirationValue.sub(expirationTypeValue).eq(0)) {
      return {
        type: expirationType as OrderExpirationType,
        expiration: BigNumber.from(rawExpiration).sub(expirationTypeValue),
      };
    }
  }
  return {
    type: 'default',
    expiration: rawExpiration,
  };
}
