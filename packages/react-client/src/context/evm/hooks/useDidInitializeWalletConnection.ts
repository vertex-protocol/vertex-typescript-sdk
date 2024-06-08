import { useEffect, useState, useSyncExternalStore } from 'react';

/**
 * Util hook for determining whether an initial client mount has occurred. This is useful as we cannot correctly load connection
 * state before this (all wallet interaction is based on localstorage, so all states will start in `disconnected` even if the user
 * is technically connected).
 *
 * This isn't foolproof, but it's a good enough heuristic for now.
 */
export function useDidInitializeWalletConnection() {
  const isClient = useIsClient();
  const [didInitialClientMount, setDidInitialClientMount] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (isClient && !didInitialClientMount) {
      // Small delay to account for any potential lag for wagmi to initialize client state
      timeout = setTimeout(() => {
        setDidInitialClientMount(true);
      }, 100);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [didInitialClientMount, isClient]);

  return didInitialClientMount;
}

/**
 * Returns `false` when on the server and during hydration, `true` after hydration.
 * https://tkdodo.eu/blog/avoiding-hydration-mismatches-with-use-sync-external-store
 */
export function useIsClient() {
  return useSyncExternalStore(
    // An empty subscribe, basically a no-op.
    emptySubscribe,
    // Called on the client after hydration.
    () => true,
    // Called on the server and during hydration.
    () => false,
  );
}

function emptySubscribe() {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return () => {};
}
