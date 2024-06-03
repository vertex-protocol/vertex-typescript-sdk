import { PrimaryChainID } from '../../../types';
import { useEVMContext } from '../EVMContext';

export function usePrimaryChainId() {
  return useEVMContext().primaryChain.id as PrimaryChainID; // as PrimaryChainID to narrow type from number to PrimaryChainID.
}
