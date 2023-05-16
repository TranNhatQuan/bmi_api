'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Userswithbmi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here

    }
  }
  Userswithbmi.init({
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    bmi: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  },
  {
    sequelize,
    modelName: 'Userswithbmi',
    timestamps: false,
    freezeTableName: true,
  });
  return Userswithbmi;
};