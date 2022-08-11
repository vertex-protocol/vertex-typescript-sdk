import { toX18 } from '@vertex/utils';

export function testContract(): string {
  return `hello` + toX18(10);
}

console.log(testContract());
