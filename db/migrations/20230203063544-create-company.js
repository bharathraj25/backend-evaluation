'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      ceo: {
        type: Sequelize.STRING
      },
      sector_name: {
        type: Sequelize.STRING,
        references: {
          model: 'Sectors',
          key: 'name'
        }
      },
      cpi: {
        type: Sequelize.STRING
      },
      cf: {
        type: Sequelize.STRING
      },
      mau: {
        type: Sequelize.STRING
      },
      roic: {
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
    await queryInterface.dropTable('Companies');
  }
};