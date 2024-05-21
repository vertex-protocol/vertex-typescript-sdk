import { ConnectionStatus, useEVMContext } from '../context';

// These are "loading" states where we should hold off on querying subaccount data
const INDETERMINATE_STATUSES: Set<ConnectionStatus['type']> = new Set([
  'initializing',
  'reconnecting',
  'connecting',
]);

/**
 * With SSR, queries start in the "disconnected" state so will run with ZeroAddress.
 * To skip unnecessary queries, we enable subaccount queries only when we've initialized the wallet connection
 */
export function useEnableSubaccountQueries() {
  const { connectionStatus } = useEVMContext();

  return !INDETERMINATE_STATUSES.has(connectionStatus.type);
}
