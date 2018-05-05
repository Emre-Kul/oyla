'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    token: DataTypes.STRING
  }, {
      hooks: {
        beforeCreate: (user) => {
          bcrypt.hashSync(user.password, bcrypt.genSaltSync());
        }
      },
      underscored: true
    });


  User.associate = function (models) {
    models.User.hasMany(models.UserMeta);
    models.User.hasOne(models.UserProfile);
  };

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }

  return User;
};