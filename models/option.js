'use strict';
module.exports = (sequelize, DataTypes) => {
  var Option = sequelize.define('Option', {
    option: DataTypes.STRING
  }, {});
  Option.associate = function(models) {
    // associations can be defined here
  };
  return Option;
};