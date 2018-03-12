'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserMeta = sequelize.define('UserMeta', {
    key: DataTypes.STRING,
    value: DataTypes.STRING
  }, {
    underscored: true
  });
  UserMeta.associate = function(models) {
    models.UserMeta.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return UserMeta;
};