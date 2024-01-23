'use strict';

var utils = require('../utils/writer.js');
var Comments = require('../service/CommentsService');

module.exports.appointmentsAppointmentIdCommentsCommentIdDELETE = function appointmentsAppointmentIdCommentsCommentIdDELETE (req, res, next) {
  var appointmentId = req.swagger.params['appointmentId'].value;
  var commentId = req.swagger.params['commentId'].value;
  Comments.appointmentsAppointmentIdCommentsCommentIdDELETE(appointmentId,commentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.appointmentsAppointmentIdCommentsCommentIdPUT = function appointmentsAppointmentIdCommentsCommentIdPUT (req, res, next) {
  var appointmentId = req.swagger.params['appointmentId'].value;
  var commentId = req.swagger.params['commentId'].value;
  var comment = req.swagger.params['comment'].value;
  Comments.appointmentsAppointmentIdCommentsCommentIdPUT(appointmentId,commentId,comment)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.v1AppointmentsAppointmentIdCommentsGET = function v1AppointmentsAppointmentIdCommentsGET (req, res, next) {
  var appointmentId = req.swagger.params['appointmentId'].value;
  Comments.v1AppointmentsAppointmentIdCommentsGET(appointmentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
