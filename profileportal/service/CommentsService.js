'use strict';


/**
 * Delete an Existing Comment
 * Delete an existing comment by its ID from a specific appointment.
 *
 * appointmentId String 
 * commentId String 
 * no response value expected for this operation
 **/
exports.appointmentsAppointmentIdCommentsCommentIdDELETE = function(appointmentId,commentId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update an Existing Comment
 * Update an existing comment by its ID on a specific appointment.
 *
 * appointmentId String 
 * commentId String 
 * comment Comment Comment object that needs to be updated
 * no response value expected for this operation
 **/
exports.appointmentsAppointmentIdCommentsCommentIdPUT = function(appointmentId,commentId,comment) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get Appointment Comments
 * Retrieve comments for a specific appointment.
 *
 * appointmentId String 
 * returns List
 **/
exports.v1AppointmentsAppointmentIdCommentsGET = function(appointmentId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

