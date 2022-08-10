import { test, utilizationRatio } from '@vertex/utils';

export function testContract(): string {
  return `hello` + test() + utilizationRatio();
}

console.log(testContract());
