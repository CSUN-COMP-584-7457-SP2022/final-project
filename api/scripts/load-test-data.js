const path = require('path');

const debug = require('debug')('tdc:scripts/load-test-data');
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
});

const {
  User,
  UserToken,
  UserRole,
  UserFirebaseAuth,
} = require('../src/services/db');

if (process.env.RUN_FUNCTION === 'scripts/load-test-data') {
  const TEST_USER_ID = -1;
  const TEST_USER_EMAIL = 'test@gmail.com';
  const TEST_USER_FIREBASE_AUTH_UID = '4lKoHy9F1tQ1bM6d2X1t0I1SbD43';
  const TEST_USER_TOKEN_SECRET = '5d85a723eda8146ac201b8c8ae7c0700';

  (async () => {
    debug('Loading test data...');

    await User.create({
      id: TEST_USER_ID,
      email: TEST_USER_EMAIL,
      firstName: 'Test',
      lastName: 'User',
    });

    await UserRole.create({
      id: -1,
      userId: TEST_USER_ID,
      role: 'ADMIN',
    });

    await UserToken.create({
      id: -1,
      userId: TEST_USER_ID,
      secret: TEST_USER_TOKEN_SECRET,
    });

    await UserFirebaseAuth.create({
      id: -1,
      userId: TEST_USER_ID,
      authUid: TEST_USER_FIREBASE_AUTH_UID,
    });

    debug('Done');
  })();
}
