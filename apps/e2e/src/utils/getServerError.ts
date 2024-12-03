export function getServerError(error: unknown) {
  const serverError = error as { response?: { data?: unknown } };

  return serverError.response?.data ?? error;
}
