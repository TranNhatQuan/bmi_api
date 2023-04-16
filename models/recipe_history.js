'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipe_history.belongsTo(models.User,{
        foreignKey: "idUser",
      });
      Recipe_history.belongsTo(models.Recipe, {
        foreignKey: "idRecipe",
      });
    }
  }
  Recipe_history.init({
    idRecipe_history: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    date: {
      allowNull: false,
      
      type: DataTypes.DATEONLY,
      //YYYY-MM-DD
    },
    filter: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Recipe_history',
    timestamps: false,
  });
  return Recipe_history;
};