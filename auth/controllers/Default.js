'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.loginPOST = function loginPOST (req, res, next) {
  var credentials = req.swagger.params['credentials'].value;
  Default.loginPOST(credentials)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.verifyGET = function verifyGET (req, res, next) {
  Default.verifyGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
