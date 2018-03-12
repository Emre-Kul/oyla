'use strict';
module.exports = (sequelize, DataTypes) => {
  var Question = sequelize.define('Question', {
    question: DataTypes.STRING,
    type: DataTypes.ENUM(
      'text_box',
      'multiple_choice',
      'voting',
      'check_box',
      'list',
      'sorting'
    )
  }, {
    underscored: true
  });
  Question.associate = function(models) {
    models.Question.belongsTo(models.Survey, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Question.hasMany(models.Option);
  };
  return Question;
};