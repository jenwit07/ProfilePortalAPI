"use strict";

var Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('roles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "roles_role_name_key"
    }
  }, {
    sequelize: sequelize,
    tableName: 'roles',
    schema: 'public',
    timestamps: false,
    indexes: [{
      name: "roles_pkey",
      unique: true,
      fields: [{
        name: "id"
      }]
    }, {
      name: "roles_role_name_key",
      unique: true,
      fields: [{
        name: "role_name"
      }]
    }]
  });
};
//# sourceMappingURL=roles.js.map