"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAppointmentService = createAppointmentService;
exports.deleteAppointmentService = deleteAppointmentService;
exports.getAppointmentByIdService = getAppointmentByIdService;
exports.getAppointmentService = getAppointmentService;
exports.updateAppointmentService = updateAppointmentService;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sequelize = require("sequelize");
var _excluded = ["cur_page", "per_page", "offset", "limit"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var stausMap = {
  "TO_DO": "To Do",
  "IN_PROGRESS": "In Progress",
  "DONE": "Done",
  "KEEP": "Keep"
};
function getAppointmentService(_x) {
  return _getAppointmentService.apply(this, arguments);
}
function _getAppointmentService() {
  _getAppointmentService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(query) {
    var cur_page, per_page, offset, limit, rest, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          cur_page = query.cur_page, per_page = query.per_page, offset = query.offset, limit = query.limit, rest = (0, _objectWithoutProperties2["default"])(query, _excluded);
          _context.next = 4;
          return appointmentDb.appointments.findAndCountAll({
            offset: offset,
            limit: limit,
            where: _objectSpread({
              status: (0, _defineProperty2["default"])({}, _sequelize.Op.ne, 'KEEP')
            }, rest),
            order: [['create_datetime', 'ASC']]
          });
        case 4:
          result = _context.sent;
          result.rows.map(function (item) {
            item.status = stausMap[item.status] || item.status;
            return item;
          });
          return _context.abrupt("return", {
            appointments: result.rows,
            total_records: result.count,
            total_pages: Math.ceil(result.count / (per_page ? parseInt(per_page) : result.count)),
            curren_page: cur_page ? parseInt(cur_page) : 1,
            per_page: per_page ? parseInt(per_page) : result.count
          });
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          throw _context.t0;
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return _getAppointmentService.apply(this, arguments);
}
function createAppointmentService(_x2) {
  return _createAppointmentService.apply(this, arguments);
}
function _createAppointmentService() {
  _createAppointmentService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    var obj;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          if (!data.status) data.status = 'TO_DO';
          if (!data.update_by) data.update_by = data.create_by;
          _context2.next = 5;
          return appointmentDb.appointments.create(data);
        case 5:
          obj = _context2.sent;
          return _context2.abrupt("return", obj);
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0;
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return _createAppointmentService.apply(this, arguments);
}
function getAppointmentByIdService(_x3) {
  return _getAppointmentByIdService.apply(this, arguments);
}
function _getAppointmentByIdService() {
  _getAppointmentByIdService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return appointmentDb.appointments.findOne({
            where: {
              id: id
            }
          });
        case 3:
          result = _context3.sent;
          if (result) {
            _context3.next = 6;
            break;
          }
          throw new Error('Appointment not found');
        case 6:
          return _context3.abrupt("return", result);
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          throw _context3.t0;
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return _getAppointmentByIdService.apply(this, arguments);
}
function updateAppointmentService(_x4, _x5) {
  return _updateAppointmentService.apply(this, arguments);
}
function _updateAppointmentService() {
  _updateAppointmentService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, data) {
    var exist, result, history;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          if (data.status) {
            _context4.next = 3;
            break;
          }
          throw new Error('Status is required');
        case 3:
          if (stausMap[data.status]) {
            _context4.next = 5;
            break;
          }
          throw new Error('Invalid status');
        case 5:
          _context4.next = 7;
          return appointmentDb.appointments.findOne({
            where: {
              id: id
            }
          });
        case 7:
          exist = _context4.sent;
          _context4.next = 10;
          return appointmentDb.appointments.update(data, {
            where: {
              id: id
            }
          });
        case 10:
          result = _context4.sent;
          if (!(result[0] === 0)) {
            _context4.next = 13;
            break;
          }
          throw new Error('Appointment not found or no changes made');
        case 13:
          delete exist.dataValues.id;
          _context4.next = 16;
          return appointmentDb.update_history.create(_objectSpread({
            appointment_id: id
          }, exist.dataValues));
        case 16:
          history = _context4.sent;
          return _context4.abrupt("return", {
            message: 'Appointment updated successfully'
          });
        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;
        case 23:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 20]]);
  }));
  return _updateAppointmentService.apply(this, arguments);
}
function deleteAppointmentService(_x6) {
  return _deleteAppointmentService.apply(this, arguments);
}
function _deleteAppointmentService() {
  _deleteAppointmentService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return appointmentDb.appointments.update({
            status: 'KEEP'
          }, {
            where: {
              id: id
            }
          });
        case 3:
          result = _context5.sent;
          if (!(result === 0)) {
            _context5.next = 8;
            break;
          }
          throw new Error('Appointment not found');
        case 8:
          return _context5.abrupt("return", {
            message: 'Appointment deleted successfully'
          });
        case 9:
          _context5.next = 14;
          break;
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          throw _context5.t0;
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return _deleteAppointmentService.apply(this, arguments);
}
//# sourceMappingURL=AppointmentsService.js.map