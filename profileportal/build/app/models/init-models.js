"use strict";

var DataTypes = require("sequelize").DataTypes;
var _appointments = require("./appointments");
var _comments = require("./comments");
var _update_history = require("./update_history");
function initModels(sequelize) {
  var appointments = _appointments(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var update_history = _update_history(sequelize, DataTypes);
  comments.belongsTo(appointments, {
    as: "appointment",
    foreignKey: "appointment_id"
  });
  appointments.hasMany(comments, {
    as: "comments",
    foreignKey: "appointment_id"
  });
  update_history.belongsTo(appointments, {
    as: "appointment",
    foreignKey: "appointment_id"
  });
  appointments.hasMany(update_history, {
    as: "update_histories",
    foreignKey: "appointment_id"
  });
  return {
    appointments: appointments,
    comments: comments,
    update_history: update_history
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports["default"] = initModels;
//# sourceMappingURL=init-models.js.map