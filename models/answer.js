'use strict';
module.exports = (sequelize, DataTypes) => {
  var Answer = sequelize.define('Answer', {
    answer: DataTypes.STRING
  }, {
    underscored: true
  });
  Answer.associate = function(models) {
    models.Answer.belongsTo(models.Option, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Answer;
};