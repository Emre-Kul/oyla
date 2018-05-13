'use strict';
module.exports = (sequelize, DataTypes) => {
  var Answer = sequelize.define('Answer', {
    answer: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true
  });
  Answer.associate = function(models) {
    models.Answer.belongsTo(models.Option, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true
      }
    });
    models.Answer.belongsTo(models.SurveyRecord, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Answer;
};