function makeApiError(
  code = 500,
  msg = 'Internal Server Error',
  originalError
) {
  const err = new Error(msg);
  err.statusCode = code;

  if (originalError && originalError.stack) {
    err.stack = originalError.stack;
  }

  return err;
}

exports.makeApiError = makeApiError;
