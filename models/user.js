'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    token: DataTypes.STRING
  }, {
    underscored: true
  });
  User.associate = function(models) {
    models.User.hasMany(models.UserMeta);
  };
  return User;
};