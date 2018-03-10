'use strict';
module.exports = (sequelize, DataTypes) => {
  var Survey = sequelize.define('Survey', {
    title: DataTypes.STRING
  }, {});
  Survey.associate = function(models) {
    // associations can be defined here
  };
  return Survey;
};