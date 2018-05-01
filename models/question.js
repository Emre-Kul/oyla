'use strict';
module.exports = (sequelize, DataTypes) => {
  var Question = sequelize.define('Question', {
    question: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(
        'textBox',
        'checkBox',
        'multipleChoices',
        'dropdownList',
        'rating',
        'sorting'
      ),
      allowNull: false
    },
    min_length: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      validate: { min: 0, max: 255 }
    },
    max_length: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      validate: { min: 0, max: 255 }
    },
  }, {
    timestamps: false,
    underscored: true,
    validate: {
      isValidRestrictions() {
        if (this.min_length != null && this.max_length != null && (this.min_length >= this.max_length)) {
          throw new Error('Invalid Restrictions.')
        }
      }
    }
  });
  Question.associate = function(models) {
    models.Question.belongsTo(models.Survey, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Question.hasMany(models.Option);
  };
  return Question;
};