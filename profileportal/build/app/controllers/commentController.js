"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateComment = exports.getComments = exports.deleteComment = exports.addComment = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _CommentsService = require("../service/CommentsService");
var getComments = exports.getComments = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _CommentsService.getCommentsService)(req.params.appointmentId);
        case 3:
          result = _context.sent;
          res.status(200).send(result);
          _context.next = 11;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(400).send({
            name: _context.t0.name,
            message: _context.t0.message
          });
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function getComments(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var addComment = exports.addComment = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          req.body.create_by = req.decoded.username;
          req.body.comment_name = req.decoded.username;
          req.body.update_by = req.decoded.username;
          _context2.next = 6;
          return (0, _CommentsService.addCommentService)(req.params.appointmentId, req.body);
        case 6:
          result = _context2.sent;
          res.status(201).send(result);
          _context2.next = 14;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(400).send({
            name: _context2.t0.name,
            message: _context2.t0.message
          });
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function addComment(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var updateComment = exports.updateComment = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          req.body.update_by = req.decoded.username;
          req.body.comment_name = req.decoded.username;
          _context3.next = 5;
          return (0, _CommentsService.updateCommentService)(req.params.commentId, req.body);
        case 5:
          response = _context3.sent;
          if (!(response == 0)) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", res.status(404).send({
            message: "Comment not found"
          }));
        case 8:
          res.status(204).send();
          _context3.next = 15;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(400).send({
            message: _context3.t0
          });
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function updateComment(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var deleteComment = exports.deleteComment = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _CommentsService.deleteCommentService)(req.params.commentId);
        case 3:
          response = _context4.sent;
          if (!(response == 0)) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", res.status(404).send({
            message: "Comment not found"
          }));
        case 6:
          res.status(204).send();
          _context4.next = 13;
          break;
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(400).send({
            message: _context4.t0
          });
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function deleteComment(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
//# sourceMappingURL=commentController.js.map