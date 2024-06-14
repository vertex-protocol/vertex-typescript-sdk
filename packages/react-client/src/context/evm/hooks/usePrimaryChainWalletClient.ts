import { useWalletClient } from 'wagmi';
import { usePrimaryChainId } from './usePrimaryChainId';

export function usePrimaryChainWalletClient() {
  const primaryChainId = usePrimaryChainId();

  return useWalletClient({
    chainId: primaryChainId,
  });
}
