'use strict';
module.exports = (sequelize, DataTypes) => {
  var Preference = sequelize.define('Preference', {
    key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true
  });

  return Preference;
};