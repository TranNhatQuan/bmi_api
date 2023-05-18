'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      idUser: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      gender: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      weight: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      height: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      
      idAcc: {
        allowNull: false,
        unique:true,
        references: { model: "Accounts", key: "idAcc" },
        type: Sequelize.INTEGER
      },
      isShare: {
        allowNull: false,
        type: Sequelize.INTEGER,
      }
    });
    await queryInterface.sequelize.query(`CREATE VIEW UsersWithBMI AS SELECT idUser,name,gender,weight,height, weight*100*100 / (height * height) as bmi FROM Users WHERE isShare=1;`);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};