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
      User_recipe.belongsTo(models.User, {
        foreignKey: "idUser",
      });
      User_recipe.belongsTo(models.Recipe, {
        foreignKey: "idRecipe",
      })
    }
  }
  User_recipe.init({
    idUser: {
      allowNull: false,
      
      primaryKey: true,
      references: { model: "User", key: "idUser" },
      type: DataTypes.INTEGER
    },
    idRecipe: {
      allowNull: false,
      
      primaryKey: true,
      references: { model: "Recipe", key: "idRecipe" },
      type: DataTypes.INTEGER
    },
    cmt:{
      allowNull: true,
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isLike: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'User_recipe',
    timestamps: false,
  });
  return User_recipe;
};