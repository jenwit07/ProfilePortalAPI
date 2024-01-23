'use strict';


/**
 * User Login
 * Authenticate user and return a token.
 *
 * credentials Credentials User login credentials
 * returns TokenResponse
 **/
exports.loginPOST = function(credentials) {
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
 * Verify Token and Get Roles
 * Verify the token and return the roles of the authenticated user.
 *
 * returns UserRoles
 **/
exports.verifyGET = function() {
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

