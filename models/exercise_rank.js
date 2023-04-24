'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Exercise_rank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exercise_rank.belongsTo(models.Exercise, {
        foreignKey: "idExercise",
      });
      
      // define association here
    }
  }
  Exercise_rank.init({
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
      level:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    
    
  }, {
    sequelize,
    modelName: 'Exercise_rank',
    timestamps: false,
  });
  return Exercise_rank;
};