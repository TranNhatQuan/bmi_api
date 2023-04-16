'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Type.hasMany(models.Recipe, {
        foreignKey: "idType",
      });
      
   
      // define association here
    }
  }
  Type.init({
    idType: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    
  }, {
    sequelize,
    modelName: 'Type',
    timestamps: false,
  });
  return Type;
};