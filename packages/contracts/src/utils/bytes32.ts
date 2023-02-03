import { Bytes, toUtf8Bytes, toUtf8String } from 'ethers/lib/utils';

/**
 * Converts subaccount owner + name to 32 bytes representation
 * @param owner subaccount owner (20 bytes)
 * @param subaccountName subaccount name
 * @returns 32 bytes representation of a subaccount
 */
export function subaccountToBytes32(
  owner: string,
  subaccountName: string,
): Bytes {
  const address = toUtf8Bytes(owner);
  const name = toUtf8Bytes(subaccountName);

  if (address.length != 20) {
    throw new Error('owner must be 20 bytes');
  }

  const bytes32 = new Uint8Array(32);
  for (let i = 0; i < address.length; i++) {
    bytes32[i] = address[i];
  }
  for (let i = 20; i < name.length; i++) {
    bytes32[i] = name[i];
  }

  return bytes32;
}

/**
 * Given a 32 bytes representation of a subaccount, returns owner + name
 * @param bytes 32 bytes representaion of a subaccount where bytes[0:20]=owner & bytes[20:32]=subaccountName
 * @returns subaccount owner + name
 */
export function subaccountFromBytes32(bytes: Bytes): {
  owner: string;
  subaccountName: string;
} {
  if (bytes.length != 32) {
    throw new Error('input must be 32 bytes');
  }

  const address = new Uint8Array(20);
  const name = new Uint8Array(12);

  for (let i = 0; i < bytes.length; i++) {
    if (i < 20) {
      address[i] = bytes[i];
    } else {
      name[i - 20] = bytes[i];
    }
  }

  return {
    owner: toUtf8String(address),
    subaccountName: toUtf8String(name),
  };
}
