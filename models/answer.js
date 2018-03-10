'use strict';
module.exports = (sequelize, DataTypes) => {
  var Answer = sequelize.define('Answer', {
    answer: DataTypes.STRING
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
  };
  return Answer;
};