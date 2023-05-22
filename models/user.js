'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Account,{
        foreignKey: "idAcc",
        as: "account",
      });
      User.hasMany(models.User_history,{
        foreignKey: "idUser",
      });
      User.hasMany(models.User_recipe,{
        foreignKey: "idUser",
      });
      User.hasMany(models.User_exercise,{
        foreignKey: "idUser",
      });
      User.hasMany(models.Recipe_history,{
        foreignKey: "idUser",
      });
    }
  }
  User.init({
    idUser: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    gender: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    height: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    
    isShare: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: false,
  });
  return User;
};