"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpdateHistoryService = getUpdateHistoryService;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
function getUpdateHistoryService(_x) {
  return _getUpdateHistoryService.apply(this, arguments);
}
function _getUpdateHistoryService() {
  _getUpdateHistoryService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(appointmentId) {
    var updateHistory;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return appointmentDb.update_history.findAll({
            where: {
              appointment_id: appointmentId
            },
            order: [['update_datetime', 'ASC']]
          });
        case 3:
          updateHistory = _context.sent;
          return _context.abrupt("return", updateHistory);
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
  return _getUpdateHistoryService.apply(this, arguments);
}
//# sourceMappingURL=UpdateHistoryService.js.map