'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe_ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recipe_ingredient.init({
    idIngredient: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipe_ingredient',
    timestamps: false,
  });
  return Recipe_ingredient;
};