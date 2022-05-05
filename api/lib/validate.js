const assert = require('assert');
const Ajv = require('ajv');
const { createError } = require('micro');
const fp = require('lodash/fp');

function validate(schema, params) {
  assert(!fp.isEmpty(schema), createError(400, 'Schema is required'));

  const ajv = new Ajv();

  const validate = ajv.compile(schema);
  const valid = validate(params);

  if (!valid) {
    throw createError(400, validate.errors[0].message);
  }
}

exports.validate = validate;
