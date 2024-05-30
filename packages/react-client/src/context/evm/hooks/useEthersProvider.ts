import { Provider } from 'ethers';
import { useMemo } from 'react';
import { usePublicClient } from 'wagmi';
import { publicClientToProvider } from '../utils';

export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const publicClient = usePublicClient({ chainId });
  return useMemo(
    (): Provider | undefined =>
      publicClient ? publicClientToProvider(publicClient) : undefined,
    [publicClient],
  );
}
