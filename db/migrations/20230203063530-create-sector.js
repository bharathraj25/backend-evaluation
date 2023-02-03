'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sectors', {
      name: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      cpi: {
        type: Sequelize.INTEGER
      },
      cf: {
        type: Sequelize.INTEGER
      },
      mau: {
        type: Sequelize.INTEGER
      },
      roic: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Sectors');
  }
};