'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu_equipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu_equipment.belongsTo(models.Equipment, {
        foreignKey: "idEquipment",
      });
      Menu_equipment.belongsTo(models.Menu, {
        foreignKey: "idMenu",
      });
    }
  }
  Menu_equipment.init({
    idMenu: {
      allowNull: false,
     
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Menu", key: "idMenu" },
    },
    idEquipment: {
      allowNull: false,
      
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Equipment", key: "idEquipment" },
    },
  }, {
    sequelize,
    modelName: 'Menu_equipment',
    timestamps: false,
  });
  return Menu_equipment;
};