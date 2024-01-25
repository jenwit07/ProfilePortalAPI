"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCommentService = addCommentService;
exports.deleteCommentService = deleteCommentService;
exports.getCommentsService = getCommentsService;
exports.updateCommentService = updateCommentService;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
function getCommentsService(_x) {
  return _getCommentsService.apply(this, arguments);
}
function _getCommentsService() {
  _getCommentsService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(appointmentId) {
    var comments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return appointmentDb.comments.findAll({
            where: {
              appointment_id: appointmentId
            },
            order: [['create_datetime', 'ASC']]
          });
        case 3:
          comments = _context.sent;
          return _context.abrupt("return", comments);
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          throw _context.t0;
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _getCommentsService.apply(this, arguments);
}
function addCommentService(_x2, _x3) {
  return _addCommentService.apply(this, arguments);
}
function _addCommentService() {
  _addCommentService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(appointmentId, commentData) {
    var appointment, newComment;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return appointmentDb.appointments.findOne({
            where: {
              id: appointmentId
            }
          });
        case 3:
          appointment = _context2.sent;
          if (appointment) {
            _context2.next = 6;
            break;
          }
          throw new Error('Appointment not found');
        case 6:
          commentData.appointment_id = appointmentId;
          _context2.next = 9;
          return appointmentDb.comments.create(commentData);
        case 9:
          newComment = _context2.sent;
          return _context2.abrupt("return", newComment);
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0;
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return _addCommentService.apply(this, arguments);
}
function updateCommentService(_x4, _x5) {
  return _updateCommentService.apply(this, arguments);
}
function _updateCommentService() {
  _updateCommentService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(commentId, commentData) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return appointmentDb.comments.update(commentData, {
            where: {
              id: commentId
            }
          });
        case 3:
          result = _context3.sent;
          if (!(result[0] === 0)) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", result);
        case 8:
          return _context3.abrupt("return", {
            message: 'Comment updated successfully'
          });
        case 9:
          _context3.next = 14;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          throw _context3.t0;
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return _updateCommentService.apply(this, arguments);
}
function deleteCommentService(_x6) {
  return _deleteCommentService.apply(this, arguments);
}
function _deleteCommentService() {
  _deleteCommentService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(commentId) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return appointmentDb.comments.destroy({
            where: {
              id: commentId
            }
          });
        case 3:
          result = _context4.sent;
          if (!(result === 0)) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", result);
        case 8:
          return _context4.abrupt("return", {
            message: 'Comment deleted successfully'
          });
        case 9:
          _context4.next = 14;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return _deleteCommentService.apply(this, arguments);
}
//# sourceMappingURL=CommentsService.js.map