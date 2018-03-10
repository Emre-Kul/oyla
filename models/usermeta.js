'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserMeta = sequelize.define('UserMeta', {
    key: DataTypes.STRING
  }, {});
  UserMeta.associate = function(models) {
    // associations can be defined here
  };
  return UserMeta;
};