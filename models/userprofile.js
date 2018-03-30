'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserProfile = sequelize.define('UserProfile', {
    fullname : DataTypes.STRING,
    birthday: DataTypes.DATE,
    sex: DataTypes.ENUM(
      'male',
      'female'
    ),
    income: DataTypes.INTEGER,
    degree: DataTypes.ENUM(
      'bachelor',
      'master',
      'doctoral'
    )
  }, {
      underscored: true
  });

  UserProfile.associate = function (models) {
    models.UserProfile.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return UserProfile;
};