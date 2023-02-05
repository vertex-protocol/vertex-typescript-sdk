import {
  arrayify,
  Bytes,
  hexlify,
  toUtf8Bytes,
  toUtf8String,
} from 'ethers/lib/utils';

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
  const address = arrayify(owner);
  const name = toUtf8Bytes(subaccountName);

  console.log(`address: ${address}`);

  if (address.length != 20) {
    throw new Error(`owner must be 20 bytes, but found ${address.length}`);
  }

  const bytes32 = new Uint8Array(32);
  for (let i = 0; i < address.length; i++) {
    bytes32[i] = address[i];
  }
  for (let i = 0; i < name.length; i++) {
    bytes32[i + 20] = name[i];
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
  name: string;
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
    owner: hexlify(address),
    name: toUtf8String(name).replace(/\0/g, ''),
  };
}

export function subaccountNameToBytes12(name: string): Bytes {
  const bytes = toUtf8Bytes(name);
  const buffer = new Uint8Array(12);
  for (let i = 0; i < bytes.length; i++) {
    buffer[i] = bytes[i];
  }
  return buffer;
}

export function subaccountToHex(owner: string, subaccountName: string): string {
  return hexlify(subaccountToBytes32(owner, subaccountName));
}

export function subaccountFromHex(subaccount: string): {
  owner: string;
  name: string;
} {
  return subaccountFromBytes32(arrayify(subaccount));
}
