import { useMemo } from 'react';
import { useWalletClient } from 'wagmi';
import { JsonRpcSigner } from 'ethers';
import { walletClientToSigner } from '../utils';

export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  return useMemo(
    (): JsonRpcSigner | undefined =>
      walletClient ? walletClientToSigner(walletClient) : undefined,
    [walletClient],
  );
}
