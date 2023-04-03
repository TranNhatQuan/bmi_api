'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Menu_equipments', {
      idMenu: {
        allowNull: false,
       
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Menus", key: "idMenu" },
      },
      idEquipment: {
        allowNull: false,
        
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Equipment", key: "idEquipment" },
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Menu_equipments');
  }
};