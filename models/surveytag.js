'use strict';
module.exports = (sequelize, DataTypes) => {
  var SurveyTag = sequelize.define('SurveyTag', {}, {
    timestamps: false,
    underscored: true
  });
  SurveyTag.associate = function(models) {
    models.SurveyTag.belongsTo(models.Survey, {
        onDelete: "CASCADE",
        foreignKey: {
            allowNull: false
        }
    });
    models.SurveyTag.belongsTo(models.Tag, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
    });
  };
  return SurveyTag;
};