'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_exercise.init({
    idExercise: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_exercise',
    timestamps: false,
  });
  return User_exercise;
};