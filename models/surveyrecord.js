'use strict';
module.exports = (sequelize, DataTypes) => {
  var SurveyRecord = sequelize.define('SurveyRecord', {
    ip: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true
  });
  SurveyRecord.associate = function(models) {
    models.SurveyRecord.belongsTo(models.Survey, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.SurveyRecord.hasMany(models.Answer);
  };
  return SurveyRecord;
};