'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_history.belongsTo(models.User, {
        foreignKey: "idUser",
      })
    }
  }
  User_history.init({
    idUser: {
      allowNull: false,
      references: { model: "User", key: "idUser" },
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    date: {
      //YYYY-MM-DD
      type: DataTypes.DATEONLY,
      primaryKey: true,
      allowNull: false,
      primaryKey: true,
    },
    weight: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    height: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    calories_in: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    calories_out: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    water: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User_history',
    timestamps: false,
  });
  return User_history;
};
