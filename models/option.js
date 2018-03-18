'use strict';
module.exports = (sequelize, DataTypes) => {
  var Option = sequelize.define('Option', {
    option: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true
  });
  Option.associate = function(models) {
    models.Option.belongsTo(models.Question, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Option.hasMany(models.Answer);
  };
  return Option;
};