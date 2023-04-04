'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Set extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Set.hasMany(models.Menu,{
        foreignKey: "idSet",
      });
      Set.belongsTo(models.Exercise, {
        foreignKey: "idExercise",
      })
    }
  }
  Set.init({
    idSet: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
  }, {
    sequelize,
    modelName: 'Set',
    timestamps: false,
  });
  return Set;
};