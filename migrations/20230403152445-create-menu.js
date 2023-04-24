'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Menus', {
      //Mot bai tap nho trong 1 set
      idMenu: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      video: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      index: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      time: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idSet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Sets", key: "idSet" },
      }
    });
    await queryInterface.addConstraint('Menus', {
      fields: ['idSet', 'index'],
      type: 'unique',
      name: 'unique_idSet_index'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Menus');
  }
};