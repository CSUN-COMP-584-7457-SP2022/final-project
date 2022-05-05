export function makeApiError(
  code: number,
  msg: string,
  ogError?: Error & { code?: string }
) {
  const err: Error & { statusCode?: number; code?: string } = new Error(msg);

  err.statusCode = code;

  if (ogError) {
    err.stack = ogError.stack;
  }

  if (ogError?.code) {
    err.code = ogError.code;
  }

  return err;
}
