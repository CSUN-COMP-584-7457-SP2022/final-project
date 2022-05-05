// api auth logic
const assert = require('assert');
const debug = require('debug')('tdc:auth');

const { User, UserRole, UserFirebaseAuth } = require('./services/db');
const { makeApiError } = require('../lib/make-api-error');
const { USER_ROLE_TYPES } = require('./interfaces');

const TOKEN_TYPES = {
  FIREBASE_AUTH: 'firebase',
  TDC_AUTH: 'tdc',
};
exports.TOKEN_TYPES = TOKEN_TYPES;

async function authenticate(req) {
  const { authorization: credentials } = req.headers;

  if (!credentials) {
    throw makeApiError(400, 'Missing credentials');
  }

  const [type, token] = (credentials || '').split(' ');
  assert(type === 'Bearer', makeApiError(400, 'Bad request'));
  assert(token, makeApiError(400, 'Bad request'));

  const [tokenType, tokenSecret] = token.split('/');
  assert(
    [TOKEN_TYPES.FIREBASE_AUTH, TOKEN_TYPES.TDC_AUTH].includes(tokenType),
    makeApiError(400, 'Bad credentials type')
  );

  const context = {
    token,
  };

  if (tokenType === TOKEN_TYPES.FIREBASE_AUTH) {
    try {
      context.userFirebaseAuth =
        (tokenSecret &&
          (await UserFirebaseAuth.findOne({
            where: { authUid: tokenSecret },
            raw: true,
          }))) ||
        null;

      context.user =
        (context.userFirebaseAuth &&
          (await User.findOne({
            where: {
              id: context.userFirebaseAuth.userId,
            },
            raw: true,
          }))) ||
        null;

      context.userRole =
        (context.user &&
          (await UserRole.findOne({
            where: {
              userId: context.user.id,
            },
            raw: true,
          }))) ||
        null;
    } catch (err) {
      debug(err);
      throw makeApiError(500, 'Failed to authenticate', err);
    }
  }

  debug(context);

  return context;
}
exports.authenticate = authenticate;

function _capabilities(context, resource) {
  if (!context) {
    return [];
  }

  // PLEASE KEEP THESE CAPABILITIES IN ALPHABETICAL ORDER !

  // Anyones capabilities
  const anyonesCapabilities = ['auth/create-account', 'ml'];

  // User capabilities
  if (
    context.userRole?.role === USER_ROLE_TYPES.USER &&
    context.user?.id === resource.userId
  ) {
    const userCapabilities = [
      ...anyonesCapabilities,
      'users/read',
      'users/update-name',
    ];

    return userCapabilities;
  }

  // Admin capabilities
  if (
    context.userRole?.role === USER_ROLE_TYPES.ADMIN &&
    context.user?.id === resource.userId
  ) {
    const adminCapabilities = [
      ...anyonesCapabilities,
      'users/read',
      'users/update-name',
    ];

    return adminCapabilities;
  }

  return anyonesCapabilities;
}

function authorize(capability, context, resource) {
  const authorized = _capabilities(context, resource).includes(capability);

  if (!authorized) {
    throw makeApiError(401, 'Unauthorized');
  }

  return true;
}
exports.authorize = authorize;
