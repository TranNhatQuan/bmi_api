'use strict';
const {
  Model
} = require('sequelize');
const recipe_ingredient = require('./recipe_ingredient');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recipe.hasMany(models.User_recipe, {
        foreignKey: "idRecipe",
      });
      Recipe.hasMany(models.Recipe_ingredient, {
        foreignKey: "idRecipe",
      });
      Recipe.hasMany(models.Recipe_history, {
        foreignKey: "idRecipe",
      });
      Recipe.hasOne(models.Recipe_rank, {
        foreignKey: "idRecipe"
      })
      Recipe.belongsTo(models.Type, {
        foreignKey: "idType",
      });
      // define association here
    }
  }
  Recipe.init({
    idRecipe: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,

    },
    info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    proteins: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    fats: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    carbo: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    points:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    
    
  }, {
    sequelize,
    modelName: 'Recipe',
    timestamps: false,
  });
  return Recipe;
};