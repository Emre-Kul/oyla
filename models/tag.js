'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    tag: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true
  });
  Tag.associate = function(models) {
    models.Tag.hasMany(models.SurveyTag);
  };
  return Tag;
};