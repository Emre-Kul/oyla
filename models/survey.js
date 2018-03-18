'use strict';
module.exports = (sequelize, DataTypes) => {
  var Survey = sequelize.define('Survey', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    underscored: true
  });
  Survey.associate = function(models) {
    models.Survey.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Survey.hasMany(models.Question);
    models.Survey.hasMany(models.SurveyTag);
  };
  return Survey;
};