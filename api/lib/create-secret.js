const crypto = require('crypto');

function createSecret() {
  return crypto.randomBytes(16).toString('hex');
}

exports.createSecret = createSecret;
