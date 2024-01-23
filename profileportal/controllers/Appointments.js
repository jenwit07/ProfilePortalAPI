'use strict';

var utils = require('../utils/writer.js');
var Appointments = require('../service/AppointmentsService');

module.exports.v1AppointmentsAppointmentIdGET = function v1AppointmentsAppointmentIdGET (req, res, next) {
  var appointmentId = req.swagger.params['appointmentId'].value;
  Appointments.v1AppointmentsAppointmentIdGET(appointmentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.v1AppointmentsAppointmentIdHistoryGET = function v1AppointmentsAppointmentIdHistoryGET (req, res, next) {
  var appointmentId = req.swagger.params['appointmentId'].value;
  Appointments.v1AppointmentsAppointmentIdHistoryGET(appointmentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.v1AppointmentsAppointmentIdHistoryPOST = function v1AppointmentsAppointmentIdHistoryPOST (req, res, next) {
  var appointmentId = req.swagger.params['appointmentId'].value;
  var changeLog = req.swagger.params['changeLog'].value;
  Appointments.v1AppointmentsAppointmentIdHistoryPOST(appointmentId,changeLog)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.v1AppointmentsAppointmentIdPUT = function v1AppointmentsAppointmentIdPUT (req, res, next) {
  var appointmentId = req.swagger.params['appointmentId'].value;
  var appointment = req.swagger.params['appointment'].value;
  Appointments.v1AppointmentsAppointmentIdPUT(appointmentId,appointment)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.v1AppointmentsGET = function v1AppointmentsGET (req, res, next) {
  Appointments.v1AppointmentsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
