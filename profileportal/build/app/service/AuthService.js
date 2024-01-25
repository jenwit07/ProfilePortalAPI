"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginService = loginService;
exports.registerUserService = registerUserService;
exports.verifyTokenService = verifyTokenService;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var JWT_SECRET = process.env.JWT_SECRET;
function loginService(_x) {
  return _loginService.apply(this, arguments);
}
function _loginService() {
  _loginService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(credentials) {
    var user, roles, role, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return authDb.users.findOne({
            where: {
              username: credentials.username
            }
          });
        case 3:
          user = _context.sent;
          _context.t0 = !user;
          if (_context.t0) {
            _context.next = 9;
            break;
          }
          _context.next = 8;
          return _bcryptjs["default"].compare(credentials.password, user.password);
        case 8:
          _context.t0 = !_context.sent;
        case 9:
          if (!_context.t0) {
            _context.next = 11;
            break;
          }
          throw new Error('Invalid username or password');
        case 11:
          _context.next = 13;
          return authDb.user_roles.findOne({
            where: {
              user_id: user.id
            }
          });
        case 13:
          roles = _context.sent;
          _context.next = 16;
          return authDb.roles.findOne({
            where: {
              id: roles.role_id
            }
          });
        case 16:
          role = _context.sent;
          token = _jsonwebtoken["default"].sign({
            userId: user.id,
            username: user.username,
            role: role.role_name
          }, JWT_SECRET, {
            expiresIn: '1h'
          });
          return _context.abrupt("return", {
            token: token
          });
        case 21:
          _context.prev = 21;
          _context.t1 = _context["catch"](0);
          throw _context.t1;
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 21]]);
  }));
  return _loginService.apply(this, arguments);
}
function verifyTokenService(_x2) {
  return _verifyTokenService.apply(this, arguments);
}
function _verifyTokenService() {
  _verifyTokenService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(token) {
    var decoded;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          //verify token and return user roles
          decoded = _jsonwebtoken["default"].verify(token, JWT_SECRET); // console.log( decoded );
          return _context2.abrupt("return", decoded);
        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0;
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 5]]);
  }));
  return _verifyTokenService.apply(this, arguments);
}
function registerUserService(_x3) {
  return _registerUserService.apply(this, arguments);
}
function _registerUserService() {
  _registerUserService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(registrationData) {
    var hashedPassword, role, user, newUser;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _bcryptjs["default"].hash(registrationData.password, 10);
        case 3:
          hashedPassword = _context3.sent;
          _context3.next = 6;
          return authDb.roles.findOne({
            where: {
              role_name: registrationData.role
            }
          });
        case 6:
          role = _context3.sent;
          if (role) {
            _context3.next = 9;
            break;
          }
          throw new Error('Invalid role');
        case 9:
          _context3.next = 11;
          return authDb.users.findOne({
            where: {
              username: registrationData.username
            }
          });
        case 11:
          user = _context3.sent;
          if (!user) {
            _context3.next = 14;
            break;
          }
          throw new Error('Username already exists');
        case 14:
          _context3.next = 16;
          return authDb.users.create({
            username: registrationData.username,
            password: hashedPassword
          });
        case 16:
          newUser = _context3.sent;
          _context3.next = 19;
          return authDb.user_roles.create({
            user_id: newUser.id,
            role_id: role.id
          });
        case 19:
          return _context3.abrupt("return", newUser);
        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          throw _context3.t0;
        case 25:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 22]]);
  }));
  return _registerUserService.apply(this, arguments);
}
//# sourceMappingURL=AuthService.js.map