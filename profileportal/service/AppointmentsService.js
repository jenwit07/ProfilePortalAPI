'use strict';


/**
 * Get Appointment Details
 * Retrieve details for a specific appointment by ID.
 *
 * appointmentId String 
 * returns AppointmentDetails
 **/
exports.v1AppointmentsAppointmentIdGET = function(appointmentId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {"empty": false};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get Appointment Update History
 * Retrieve the update history for a specific appointment.
 *
 * appointmentId String 
 * returns List
 **/
exports.v1AppointmentsAppointmentIdHistoryGET = function(appointmentId) {
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


/**
 * Add Update History Entry
 * Add a new entry to the update history for a specific appointment.
 *
 * appointmentId String 
 * changeLog ChangeLog Change log entry to add
 * no response value expected for this operation
 **/
exports.v1AppointmentsAppointmentIdHistoryPOST = function(appointmentId,changeLog) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Edit Appointment
 * Update details for a specific appointment by ID.
 *
 * appointmentId String 
 * appointment Appointment Appointment object that needs to be updated
 * no response value expected for this operation
 **/
exports.v1AppointmentsAppointmentIdPUT = function(appointmentId,appointment) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get List of Appointments
 * Retrieve a list of all appointments.
 *
 * returns List
 **/
exports.v1AppointmentsGET = function() {
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

