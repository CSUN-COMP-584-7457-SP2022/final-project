const assert = require('assert');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../../.env'),
});
const debug = require('debug')('tdc:api/services/db');
const { Sequelize, DataTypes } = require('sequelize');
const moment = require('moment');

const { USER_ROLE_TYPES } = require('../interfaces');
const { createSecret } = require('../../lib/create-secret');

const DB_CONFIG = {
  USERNAME: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  HOSTNAME: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  DATABASE_NAME: process.env.DB_NAME,
  DIALECT: process.env.DB_DIALECT,
};

debug(DB_CONFIG);

const db = new Sequelize(
  `${DB_CONFIG.DIALECT}://${DB_CONFIG.USERNAME}:${DB_CONFIG.PASSWORD}@${DB_CONFIG.HOSTNAME}:${DB_CONFIG.PORT}/${DB_CONFIG.DATABASE_NAME}`,
  {
    logging: (msg) => debug(msg),
  }
);

function createTransaction() {
  return db.transaction();
}
exports.createTransaction = createTransaction;

const User = db.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Choosing to use STRING datatype here to match datatype in database
    // STRING is equivalent to varchar(255)
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.TEXT,
    },
    lastName: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'users',
    underscored: true,
  }
);
assert(User === db.models.User);
exports.User = User;

const UserRole = db.define(
  'UserRole',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM([USER_ROLE_TYPES.ADMIN, USER_ROLE_TYPES.USER]),
      defaultValue: USER_ROLE_TYPES.USER,
    },
  },
  {
    tableName: 'user_roles',
    underscored: true,
  }
);
// one to one relation
User.hasOne(UserRole);
UserRole.belongsTo(User);
assert(UserRole === db.models.UserRole);
exports.UserRole = UserRole;

const DEFAULT_USER_TOKEN_EXPIRATION_IN_DAYS = 30;
const UserToken = db.define(
  'UserToken',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      defaultValue: moment()
        .add(DEFAULT_USER_TOKEN_EXPIRATION_IN_DAYS, 'days')
        .toDate(),
    },
    secret: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: createSecret,
    },
  },
  { tableName: 'user_tokens', underscored: true }
);
// one to many relation
User.hasMany(UserToken);
UserToken.belongsTo(User);
assert(UserToken === db.models.UserToken);
exports.UserToken = UserToken;

const UserFirebaseAuth = db.define(
  'UserFirebaseAuth',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Choosing to use STRING datatype here to match datatype in database
    // STRING is equivalent to varchar(255)
    authUid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { tableName: 'user_firebase_auths', underscored: true }
);
// one to one relation
User.hasOne(UserFirebaseAuth);
UserFirebaseAuth.belongsTo(User);
assert(UserFirebaseAuth === db.models.UserFirebaseAuth);
exports.UserFirebaseAuth = UserFirebaseAuth;
