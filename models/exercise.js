'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exercise.hasMany(models.User_exercise, {
        foreignKey: "idExercise",
      });
      Exercise.hasOne(models.Exercise_rank,{
        foreignKey: "idExercise",
      })
      Exercise.hasMany(models.Set, {
        foreignKey: "idExercise",
      });
    }
  }
  Exercise.init({
    idExercise: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    points:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Exercise',
    timestamps: false,
  });
  return Exercise;
};