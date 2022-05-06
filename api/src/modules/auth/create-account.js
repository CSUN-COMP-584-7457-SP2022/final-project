const assert = require('assert');
const debug = require('debug')('tdc:auth/create-account');
const { json } = require('micro');

const { makeApiError } = require('../../../lib/make-api-error');
const { validate } = require('../../../lib/validate');
const { authorize, authenticate, TOKEN_TYPES } = require('../../auth');
const {
  createTransaction,
  User,
  UserRole,
  UserFirebaseAuth,
} = require('../../services/db');

async function createAccount(
  params,
  context,
  {
    UserInjection = User,
    UserRoleInjection = UserRole,
    UserFirebaseAuthInjection = UserFirebaseAuth,
  } = {}
) {
  validate(
    {
      type: 'object',
      properties: {
        email: { type: 'string' },
      },
      required: ['email'],
      additionalProperties: true,
    },
    params
  );

  authorize('auth/create-account', context, {});

  const [tokenType, tokenSecret] = (context.token || '/').split('/');

  assert(
    [TOKEN_TYPES.FIREBASE_AUTH, TOKEN_TYPES.TDC_AUTH].includes(tokenType),
    makeApiError(400, 'Bad credentials type')
  );
  assert(tokenSecret, makeApiError(400, 'Bad credentials'));

  let transaction;

  const data = {};

  try {
    transaction = await createTransaction();

    if (tokenType === TOKEN_TYPES.FIREBASE_AUTH) {
      let userCreated;
      [data.user, userCreated] = await UserInjection.findOrCreate({
        where: {
          email: params.email,
        },
        defaults: {
          firstName: params.firstName ?? 'Guest',
          lastName: params.lastName ?? 'User',
        },
        transaction,
      });

      if (!userCreated) {
        throw makeApiError(422, 'User already exists');
      }

      let userFirebaseAuthCreated;
      [data.userFirebaseAuth, userFirebaseAuthCreated] =
        await UserFirebaseAuthInjection.findOrCreate({
          where: {
            authUid: tokenSecret,
          },
          defaults: {
            userId: data.user.id,
          },
          transaction,
        });

      if (!userFirebaseAuthCreated) {
        assert(
          userFirebaseAuth.userId === data.user.id,
          makeApiError(403, 'Fobidden')
        );
      }
    }

    let userRoleCreated;
    [data.userRole, userRoleCreated] = await UserRoleInjection.findOrCreate({
      where: {
        userId: data.user.id,
      },
      transaction,
    });

    if (!userRoleCreated) {
      throw makeApiError(422, 'User role already assigned');
    }

    await transaction.commit();
  } catch (err) {
    debug(err);
    debug(data);

    await transaction?.rollback();

    throw err.statusCode
      ? err
      : makeApiError(500, 'Failed to create user', err);
  }

  return {
    data,
    errors: [],
  };
}

exports.POST = async (req) =>
  createAccount(await json(req), await authenticate(req));
