import { useWalletClient, UseWalletClientParameters } from 'wagmi';
import { usePrimaryChainId } from './usePrimaryChainId';

export function usePrimaryChainWalletClient(
  params?: UseWalletClientParameters,
) {
  const primaryChainId = usePrimaryChainId();
  const { data } = useWalletClient({ chainId: primaryChainId, ...params });

  return data;
}
