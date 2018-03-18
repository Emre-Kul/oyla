'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserMeta = sequelize.define('UserMeta', {
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