'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Equipment.hasMany(models.Menu_equipment,{
        foreignKey: "idEquipment",
        
      });
    }
  }
  Equipment.init({
    idEquipment: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    
    name: {
      allowNull: false,
      type: DataTypes.STRING(45)
    },
    image: {
      allowNull: false,
      type: DataTypes.TEXT,
    }
  }, {
    sequelize,
    modelName: 'Equipment',
    timestamps: false,
    freezeTableName: true,
  });
  return Equipment;
};