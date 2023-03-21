/**
 * Generates an order nonce based on recvTime in milliseconds, defaulting to Date.now() + 100 seconds
 * @param recvTimeMillis
 * @param randomInt a random integer to avoid hash collisions
 */
export function getOrderNonce(
  recvTimeMillis: number = Date.now() + 100 * 1000,
  randomInt: number = Math.floor(Math.random() * 1000),
): string {
  return ((BigInt(recvTimeMillis) << 20n) + BigInt(randomInt)).toString();
}

/**
 * Gets the recvTime in millis from an order nonce
 *
 * @param orderNonce
 */
export function getRecvTimeFromOrderNonce(orderNonce: string): number {
  const bigIntRecvTime = BigInt(orderNonce) >> 20n;
  return Number(bigIntRecvTime.toString());
}
