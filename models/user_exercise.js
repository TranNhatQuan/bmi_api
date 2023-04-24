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
      User_exercise.belongsTo(models.User, {
        foreignKey: "idUser",
      });
      User_exercise.belongsTo(models.Exercise, {
        foreignKey: "idExercise",
      });
    }
  }
  User_exercise.init({
    idUser: {
      allowNull: false,
      
      primaryKey: true,
      references: { model: "User", key: "idUser" },
      type: DataTypes.INTEGER
    },
    idExercise: {
      allowNull: false,
      
      primaryKey: true,
      references: { model: "Exercise", key: "idExercise" },
      type: DataTypes.INTEGER
    },
    cmt:{
      allowNull: true,
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isLike: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'User_exercise',
    timestamps: false,
  });
  return User_exercise;
};