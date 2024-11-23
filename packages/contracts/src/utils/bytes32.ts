import {
  Bytes,
  Subaccount,
  SubaccountBytes32,
  SubaccountNameBytes12,
} from '../common';
import { getBytes, hexlify, toUtf8Bytes, toUtf8String } from 'ethers';

/**
 * Converts a subaccount object (owner + name) to its bytes32 representation.
 * @param subaccount subaccount object (owner + name)
 * @returns bytes32 representation of a subaccount
 */
export function subaccountToBytes32(subaccount: Subaccount): SubaccountBytes32 {
  const address = getBytes(subaccount.subaccountOwner);
  const name = toUtf8Bytes(subaccount.subaccountName);

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
 * Given a bytes32 representation of a subaccount, returns a subaccount object (owner + name)
 * @param bytes bytes32 representation of a subaccount where bytes[0:20]=owner & bytes[20:32]=subaccountName
 * @returns subaccount object (owner + name)
 */
export function subaccountFromBytes32(bytes: SubaccountBytes32): Subaccount {
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
    subaccountOwner: hexlify(address),
    subaccountName: bytesToStrFallback(name),
  };
}

/**
 * Converts a subaccount name to its bytes12 representation.
 * @param name subaccount name
 * @returns bytes12 representation of a subaccount name.
 */
export function subaccountNameToBytes12(name: string): SubaccountNameBytes12 {
  return strToBytes(name, 12);
}

/**
 * Converts a subaccount object (owner + name) to its hex string representation.
 * @param subaccount subaccount object (owner + name)
 * @returns hex string representation of a subaccount
 */
export function subaccountToHex(subaccount: Subaccount): string {
  return hexlify(subaccountToBytes32(subaccount));
}

/**
 * Converts a hex string representation of a bytes32 subaccount to a subaccount object (owner + name)
 * @param subaccount hex string representation of a bytes32 subaccount.
 * @returns subaccount object (owner + name)
 */
export function subaccountFromHex(subaccount: string): Subaccount {
  return subaccountFromBytes32(getBytes(subaccount));
}

/**
 * Converts a string to a bytes array of fixed length, padding with zero bytes if necessary.
 * @param input input string
 * @param bytesLen length of the resulting bytes array
 * @returns padded bytes array
 */
export function strToBytes(input: string, bytesLen: number): Bytes {
  const bytes = toUtf8Bytes(input);
  const buffer = new Uint8Array(bytesLen);
  for (let i = 0; i < bytes.length; i++) {
    buffer[i] = bytes[i];
  }
  return buffer;
}

/**
 * Converts a bytes array to a string, attempting to decode as UTF-8 first.
 * Falls back to returning a hex representation if decoding fails.
 * @param input input bytes array
 * @returns decoded string or hex representation
 */
export function bytesToStrFallback(input: Bytes): string {
  try {
    // Attempt to decode as UTF-8
    return toUtf8String(input).replace(/\0/g, '');
  } catch {
    // Fallback to hex representation if decoding fails
    return hexlify(input);
  }
}
