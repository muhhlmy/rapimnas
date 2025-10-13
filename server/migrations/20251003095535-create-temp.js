'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Temps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kta: {
        type: Sequelize.STRING
      },
      position_prov: {
        type: Sequelize.STRING
      },
      id_prov: {
        type: Sequelize.STRING
      },
      name_prov:{
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM("male", "female"),
      },
      role:{
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Temps');
  }
};