import {
  Bytes,
  Subaccount,
  SubaccountBytes32,
  SubaccountNameBytes12,
} from '../common';
import { getBytes, hexlify, toUtf8Bytes, toUtf8String } from 'ethers';

/**
 * Converts a subaccount object (owner + name) to it's bytes32 representation.
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
 * @param bytes bytes32 representaion of a subaccount where bytes[0:20]=owner & bytes[20:32]=subaccountName
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
    subaccountName: bytesToStr(name),
  };
}

/**
 * When interacting with the contracts (e.g: deposit collateral);
 * subaccount name is represented as bytes12.
 * This util converts a subaccount name to it's bytes12 representation.
 * @param name subaccount name
 * @returns bytes12 representation of a subaccount name.
 */
export function subaccountNameToBytes12(name: string): SubaccountNameBytes12 {
  return strToBytes(name, 12);
}

/**
 * When interacting with the engine, we need to send a hex string representation
 * of the bytes32 of a subaccount for serialization reasons. This util
 * converts a subaccount object (owner + name) to such hex representation.
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

export function strToBytes(input: string, bytesLen: number): Bytes {
  const bytes = toUtf8Bytes(input);
  const buffer = new Uint8Array(bytesLen);
  for (let i = 0; i < bytes.length; i++) {
    buffer[i] = bytes[i];
  }
  return buffer;
}

export function bytesToStr(input: Bytes): string {
  // toUtf8String will replace zero bytes with \0, so strip them out here
  return toUtf8String(input).replace(/\0/g, '');
}
