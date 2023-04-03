'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_recipe.init({
    idRecipe: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_recipe',
    timestamps: false,
  });
  return User_recipe;
};