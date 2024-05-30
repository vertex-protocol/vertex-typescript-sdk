/**
 * Creates a query key that contains items UP TO the first null/undefined argument.
 */
export function createQueryKey(label: string, ...args: unknown[]): string[] {
  const baseKey = [label, ...args];

  const queryKey: string[] = [];
  for (const key of baseKey) {
    if (key == null) {
      break;
    }
    if (Array.isArray(key) || typeof key === 'object') {
      // Stringify arrays & objects
      queryKey.push(JSON.stringify(key));
    } else {
      // Primitives can be mapped to string
      queryKey.push(key.toString());
    }
  }

  return queryKey;
}
