import { useEVMContext } from '../context';

export function useIsChainType() {
  const {
    primaryChainMetadata: { chainType },
  } = useEVMContext();

  const isArb = chainType === 'arbitrum';
  const isBlast = chainType === 'blast';
  const isMantle = chainType === 'mantle';

  return {
    isArb,
    isBlast,
    isMantle,
  };
}
