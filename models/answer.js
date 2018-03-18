'use strict';
module.exports = (sequelize, DataTypes) => {
  var Answer = sequelize.define('Answer', {
    answer: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true
  });
  Answer.associate = function(models) {
    models.Answer.belongsTo(models.Option, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Answer;
};