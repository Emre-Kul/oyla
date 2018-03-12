'use strict';
module.exports = (sequelize, DataTypes) => {
  var Survey = sequelize.define('Survey', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT
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
  };
  return Survey;
};