"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = exports.authSqualize = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
require('custom-env').env("".concat(process.env.NODE_ENV));
var sequelize = exports.sequelize = new _sequelize["default"](process.env.DATABASE, process.env.USER_DB, process.env.PASSWORD, {
  logging: false,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  operatorsAliases: false,
  omitNull: true,
  port: process.env.DB_PORT,
  timezone: '+07:00',
  pool: process.env.DB_POOL,
  define: {
    schema: 'public'
  }
});
var authSqualize = exports.authSqualize = new _sequelize["default"](process.env.AUTH_DATABASE, process.env.AUTH_USER_DB, process.env.AUTH_PASSWORD, {
  logging: false,
  host: process.env.AUTH_HOST,
  dialect: process.env.AUTH_DIALECT,
  operatorsAliases: false,
  omitNull: true,
  port: process.env.AUTH_DB_PORT,
  timezone: '+07:00',
  pool: process.env.AUTH_DB_POOL,
  define: {
    schema: 'public'
  }
});
//# sourceMappingURL=db.config.js.map