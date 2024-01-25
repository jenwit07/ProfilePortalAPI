"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkUserPermission = exports.authenticate = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
require("custom-env").env("".concat(process.env.NODE_ENV));
var JWT_SECRET = process.env.JWT_SECRET;
var authenticate = exports.authenticate = function authenticate(req, res, next) {
  var token = req.headers.authorization.replace('Bearer ', '');
  if (token) {
    _jsonwebtoken["default"].verify(token, JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};
var checkUserPermission = exports.checkUserPermission = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var decode, permission, user, modifiedUrl, commentIdIndex, foundCommentById;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          decode = req.decoded;
          permission = new Set(['PUT:/profileportal/v1/appointments/comments', 'DELETE:/profileportal/v1/appointments/comments']);
          user = decode.username;
          if (user) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(403).send({
            message: "You are not allowed to update this comment"
          }));
        case 6:
          modifiedUrl = req.originalUrl.split('?')[0];
          commentIdIndex = modifiedUrl.lastIndexOf('/');
          modifiedUrl = modifiedUrl.substring(0, commentIdIndex);

          // console.log(`${req.method}:${modifiedUrl}`);
          if (!permission.has("".concat(req.method, ":").concat(modifiedUrl))) {
            _context.next = 17;
            break;
          }
          _context.next = 12;
          return appointmentDb.comments.findOne({
            where: {
              id: req.params.commentId
            }
          });
        case 12:
          foundCommentById = _context.sent;
          if (foundCommentById) {
            _context.next = 15;
            break;
          }
          return _context.abrupt("return", res.status(404).send({
            message: "Comment not found"
          }));
        case 15:
          if (!(foundCommentById.comment_name !== user)) {
            _context.next = 17;
            break;
          }
          return _context.abrupt("return", res.status(403).send({
            message: "You are not allowed to update this comment"
          }));
        case 17:
          _context.next = 23;
          break;
        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).send({
            message: "Internal server error"
          }));
        case 23:
          next();
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 19]]);
  }));
  return function checkUserPermission(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=auth.js.map