import { useWalletClient } from 'wagmi';
import { usePrimaryChainId } from './usePrimaryChainId';

export function usePrimaryChainWalletClient() {
  const primaryChainId = usePrimaryChainId();

  const { data } = useWalletClient({
    chainId: primaryChainId,
  });

  return data;
}
