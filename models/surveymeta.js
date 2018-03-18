'use strict';
module.exports = (sequelize, DataTypes) => {
  var SurveyMeta = sequelize.define('SurveyMeta', {
    key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true
  });
  SurveyMeta.associate = function(models) {
    models.SurveyMeta.belongsTo(models.Survey, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return SurveyMeta;
};