'use strict';
module.exports = (sequelize, DataTypes) => {
  var Question = sequelize.define('Question', {
    question: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(
        'text_box',
        'multiple_choice',
        'voting',
        'check_box',
        'list',
        'sorting'
      ),
      allowNull: false
    },
    restriction: DataTypes.STRING
  }, {
    timestamps: false,
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