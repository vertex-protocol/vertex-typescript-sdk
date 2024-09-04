import { useEVMContext } from '../context';

export function useIsChainType() {
  const {
    primaryChainMetadata: { chainType },
  } = useEVMContext();

  const isArb = chainType === 'arbitrum';
  const isBase = chainType === 'base';
  const isBlast = chainType === 'blast';
  const isMantle = chainType === 'mantle';
  const isSei = chainType === 'sei';

  return {
    isArb,
    isBase,
    isBlast,
    isMantle,
    isSei,
  };
}
