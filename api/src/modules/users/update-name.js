const assert = require('assert');
const debug = require('debug')('tdc:users/update-name');
const { json } = require('micro');

const { makeApiError } = require('../../../lib/make-api-error');
const { validate } = require('../../../lib/validate');
const { authorize, authenticate } = require('../../auth');
const { createTransaction, User } = require('../../services/db');

async function usersUpdateName(params, context, { UserInjection = User } = {}) {
  validate(
    {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
      },
    },
    params
  );

  const data = {};
  const errors = [];

  let transaction;

  assert(context.user && context.user.id, makeApiError(422, 'Invalid user'));

  try {
    transaction = await createTransaction();

    const user = await UserInjection.findOne({
      where: {
        id: context.user.id,
      },
      transaction,
      raw: true,
    });

    authorize('users/update-name', context, { userId: user.id });

    await UserInjection.update(
      {
        firstName: params.firstName,
        lastName: params.lastName,
      },
      {
        where: {
          id: context.user.id,
        },
        transaction,
      }
    );

    await transaction.commit();
  } catch (err) {
    await transaction?.rollback();

    errors.push(err);

    debug({ data, errors });
  }

  return { data, errors };
}

exports.POST = async (req) =>
  usersUpdateName(await json(req), await authenticate(req));
