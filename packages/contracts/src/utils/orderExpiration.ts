import { BigNumber, BigNumberish } from 'ethers';

// All valid "special" order expiration types
export type OrderExpirationType = 'default' | 'ioc' | 'fok' | 'post_only';

// 2 MSBs of u64
const EXPIRATION_TYPE_TO_MS2B: Record<OrderExpirationType, bigint> = {
  default: 0n,
  ioc: 1n,
  fok: 2n,
  post_only: 3n,
};

/**
 * Special order types, such as immediate-or-cancel, are encoded into the expiration field.
 * This is a utility to create the proper timestamp needed
 *
 * @param type The type of expiration
 * @param expiration The expiration timestamp in UNIX seconds
 */
export function getExpirationTimestamp(
  type: OrderExpirationType,
  expiration: number,
): BigNumber {
  const bigIntVal =
    BigInt(expiration.toFixed(0)) | (EXPIRATION_TYPE_TO_MS2B[type] << 62n);
  return BigNumber.from(bigIntVal);
}

/**
 * Parses the expiration timestamp into the expiration type and expiration timestamp in UNIX seconds
 *
 * @param rawExpiration
 */
export function parseRawExpirationTimestamp(rawExpiration: BigNumberish): {
  type: OrderExpirationType;
  expiration: number;
} {
  const bigIntRawExpiration = BigInt(BigNumber.from(rawExpiration).toString());
  const largestTwoBits = bigIntRawExpiration >> 62n;

  const expirationType = (() => {
    if (largestTwoBits === EXPIRATION_TYPE_TO_MS2B.default) {
      return 'default';
    }
    if (largestTwoBits === EXPIRATION_TYPE_TO_MS2B.ioc) {
      return 'ioc';
    }
    if (largestTwoBits === EXPIRATION_TYPE_TO_MS2B.fok) {
      return 'fok';
    }
    if (largestTwoBits === EXPIRATION_TYPE_TO_MS2B.post_only) {
      return 'post_only';
    }
    throw new Error(
      `Could not detect order expiration type. Raw expiration ${bigIntRawExpiration.toString()}`,
    );
  })();
  const bigIntExpiration = bigIntRawExpiration - (largestTwoBits << 62n);

  return {
    type: expirationType,
    expiration: Number(bigIntExpiration.toString()),
  };
}
