export function isErrorInResponseData(
  error: unknown,
): error is { response: { data: unknown } } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof error.response === 'object' &&
    error.response !== null &&
    'data' in error.response
  );
}
