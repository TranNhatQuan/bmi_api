'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recipe_rank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recipe_rank.belongsTo(models.Recipe, {
        foreignKey: "idRecipe",
      });
      
      // define association here
    }
  }
  Recipe_rank.init({
    rank:{
        type:DataTypes.INTEGER,
        primaryKey:true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,

      },
      calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      points:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    
    
  }, {
    sequelize,
    modelName: 'Recipe_rank',
    timestamps: false,
  });
  return Recipe_rank;
};