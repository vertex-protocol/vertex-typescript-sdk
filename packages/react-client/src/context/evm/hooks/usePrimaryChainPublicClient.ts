import { usePublicClient } from 'wagmi';
import { usePrimaryChainId } from './usePrimaryChainId';

export function usePrimaryChainPublicClient() {
  const primaryChainId = usePrimaryChainId();

  return usePublicClient({ chainId: primaryChainId });
}
