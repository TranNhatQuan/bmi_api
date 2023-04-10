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
      Recipe_ingredient.belongsTo(models.Recipe,{
        foreignKey: "idRecipe",
      });
      Recipe_ingredient.belongsTo(models.Ingredient, {
        foreignKey: "idIngredient",
      })
      
    }
  }
  Recipe_ingredient.init({
    idRecipe: {
      allowNull: false,
      
      primaryKey: true,
      references: { model: "Recipe", key: "idRecipe" },
      type: DataTypes.INTEGER
    },
    idIngredient: {
      allowNull: false,
      
      primaryKey: true,
      references: { model: "Ingredient", key: "idIngredient" },
      type: DataTypes.INTEGER
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    unitName: {
      allowNull: false,
      type: DataTypes.STRING(10),
    }
  }, {
    sequelize,
    modelName: 'Recipe_ingredient',
    timestamps: false,
  });
  return Recipe_ingredient;
};