'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_history.init({
    weight: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_history',
    timestamps: false,
  });
  return User_history;
};