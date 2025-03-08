import { Hash, PublicClient } from 'viem';

export async function waitForTransaction(
  txHashPromise: Promise<Hash>,
  publicClient: PublicClient,
) {
  return publicClient.waitForTransactionReceipt({
    hash: await txHashPromise,
  });
}
