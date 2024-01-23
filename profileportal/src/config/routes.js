import { Router } from "express";
import { authenticate } from "../app/middleware/auth";
import { getAppointments, createAppointment, getAppointmentById,updateAppointment, deleteAppointment } from "../app/controllers/appointmentController";
import { getComments, addComment, updateComment, deleteComment } from "../app/controllers/commentController";
import { getUpdateHistory, addUpdateHistory } from "../app/controllers/updateHistoryController";
import { loginUser, verifyToken, registerUser } from "../app/controllers/authController";
import { pagination } from "../app/middleware/pagination";


module.exports = function (app) {
  const router = Router();
  app.use("/profileportal/v1", router);

  router.use((req, res, next) => {
    console.log("**Start Log Request")
    console.log("profileportal backend is getting request with path : /v1" + req.path);
    if (!!!req.query) {
      console.log(" --> req.query is : ");
      console.log(JSON.stringify(req.query, null, 2));
    }
    if (!!!req.body) {
      console.log(" --> req.body is : ");
      console.log(JSON.stringify(req.body, null, 2));
    }
    console.log("**End Log Request")
    next();
  } );
  

  // Appointments Routes
  router.get('/appointments', authenticate, pagination, getAppointments);
  router.post('/appointments', authenticate, createAppointment);
  router.get('/appointments/:appointmentId', authenticate, getAppointmentById);
  router.put('/appointments/:appointmentId', authenticate, updateAppointment);
  router.delete( '/appointments/:appointmentId', authenticate, deleteAppointment );
  router.get('/appointments/:appointmentId/history', authenticate, getUpdateHistory);
  
  // Comments Routes
  router.get('/appointments/:appointmentId/comments', authenticate, pagination, getComments);
  router.post('/appointments/:appointmentId/comments', authenticate, addComment);
  router.put('/appointments/comments/:commentId', authenticate, checkUserPermission, updateComment);
  router.delete('/appointments/comments/:commentId', authenticate, checkUserPermission, deleteComment);
  
  // Authentication Routes
  router.post('/auth/login', loginUser);
  router.get('/auth/verify', authenticate, verifyToken);
  router.post('/auth/register', registerUser);
};
