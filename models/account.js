'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.hasOne(models.User,{
        foreignKey: "idUser",
       
      })
      // define association here
    }
  }
  Account.init({
    idAcc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    mail: {
      type: DataTypes.STRING(255),
      allowNull: false, 
      unique: true, 
      validate:{
        isEmail: true,
      } 
    },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {type: DataTypes.INTEGER, allowNull: false},
    forgot: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Account',
    timestamps: false,
  });
  return Account;
};