'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu.hasMany(models.Menu_equipment,{
        foreignKey: "idMenu",
      });
      Menu.belongsTo(models.Set,{
        foreignKey: "idSet",
      });
    }
  }
  Menu.init({
    idMenu: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    video: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
  }, {
    sequelize,
    modelName: 'Menu',
    timestamps: false,
  });
  return Menu;
};