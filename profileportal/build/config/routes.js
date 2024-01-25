"use strict";

var _express = require("express");
var _auth = require("../app/middleware/auth");
var _appointmentController = require("../app/controllers/appointmentController");
var _commentController = require("../app/controllers/commentController");
var _updateHistoryController = require("../app/controllers/updateHistoryController");
var _authController = require("../app/controllers/authController");
var _pagination = require("../app/middleware/pagination");
module.exports = function (app) {
  var router = (0, _express.Router)();
  app.use("/profileportal/v1", router);

  // router.use((req, res, next) => {
  //   console.log("**Start Log Request")
  //   console.log("profileportal backend is getting request with path : /v1" + req.path);
  //   if (!!!req.query) {
  //     console.log(" --> req.query is : ");
  //     console.log(JSON.stringify(req.query, null, 2));
  //   }
  //   if (!!!req.body) {
  //     console.log(" --> req.body is : ");
  //     console.log(JSON.stringify(req.body, null, 2));
  //   }
  //   console.log("**End Log Request")
  //   next();
  // });

  // Appointments Routes
  router.get('/appointments', _auth.authenticate, _pagination.pagination, _appointmentController.getAppointments);
  router.post('/appointments', _auth.authenticate, _appointmentController.createAppointment);
  router.get('/appointments/:appointmentId', _auth.authenticate, _appointmentController.getAppointmentById);
  router.put('/appointments/:appointmentId', _auth.authenticate, _appointmentController.updateAppointment);
  router["delete"]('/appointments/:appointmentId', _auth.authenticate, _appointmentController.deleteAppointment);
  router.get('/appointments/:appointmentId/history', _auth.authenticate, _updateHistoryController.getUpdateHistory);

  // Comments Routes
  router.get('/appointments/:appointmentId/comments', _auth.authenticate, _pagination.pagination, _commentController.getComments);
  router.post('/appointments/:appointmentId/comments', _auth.authenticate, _commentController.addComment);
  router.put('/appointments/comments/:commentId', _auth.authenticate, _auth.checkUserPermission, _commentController.updateComment);
  router["delete"]('/appointments/comments/:commentId', _auth.authenticate, _auth.checkUserPermission, _commentController.deleteComment);

  // Authentication Routes
  router.post('/auth/login', _authController.loginUser);
  router.get('/auth/verify', _auth.authenticate, _authController.verifyToken);
  router.post('/auth/register', _authController.registerUser);
};
//# sourceMappingURL=routes.js.map