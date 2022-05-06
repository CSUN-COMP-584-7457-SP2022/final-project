const assert = require('assert');
const debug = require('debug')('tdc:users/read');
const fp = require('lodash/fp');

const { makeApiError } = require('../../../lib/make-api-error');
const { authorize, authenticate } = require('../../auth');
const { User, UserRole } = require('../../services/db');

const USER_SAFE_PROPERTIES = ['email', 'firstName', 'lastName'];
const USER_ROLE_SAFE_PROPERTIES = ['role'];

async function usersRead(
  _params,
  context,
  { UserInjection = User, UserRoleInjection = UserRole } = {}
) {
  assert(context.user && context.user.id, makeApiError(401, 'Unauthorized'));
  assert(
    context.userRole && context.userRole.role,
    makeApiError(401, 'Unauthorized')
  );

  const user = await UserInjection.findOne({
    where: {
      id: context.user.id,
    },
    raw: true,
  });

  const userRole = await UserRoleInjection.findOne({
    where: {
      userId: context.user.id,
    },
    raw: true,
  });

  authorize('users/read', context, { userId: user.id });

  const data = {
    user: fp.pick(USER_SAFE_PROPERTIES, user),
    userRole: fp.pick(USER_ROLE_SAFE_PROPERTIES, userRole),
  };

  debug(data);

  return {
    data,
    errors: [],
  };
}

exports.GET = async (req) => usersRead({}, await authenticate(req));
