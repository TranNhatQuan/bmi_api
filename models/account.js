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
        as: "user",
      })
      // define association here
    }
  }
  Account.init({
    idAcc: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mail: { type: DataTypes.STRING(255), allowNull: false },
    password: { type: DataTypes.INTEGER(6), allowNull: false },
    role: {type: DataTypes.INTEGER(1), allowNull: false}
  },
  {
    sequelize,
    modelName: 'Account',
    timestamps: false,
  });
  return Account;
};