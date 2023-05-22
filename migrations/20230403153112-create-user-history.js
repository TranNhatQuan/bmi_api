'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_histories', {
      idUser: {
        allowNull: false,
        references: { model: "Users", key: "idUser" },
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATEONLY,
        primaryKey: true,
        allowNull: false,
      },
      weight: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      height: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      calories_in: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      calories_out: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      water: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User_histories');
  }
};
