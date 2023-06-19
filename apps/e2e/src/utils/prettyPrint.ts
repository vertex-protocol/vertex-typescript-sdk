import { toPrintableObject } from '@vertex-protocol/utils';

/**
 * Util for pretty printing JSON
 */
export function prettyPrint(label: string, obj: unknown) {
  console.log(label);
  console.log(JSON.stringify(toPrintableObject(obj), null, 2));
}
