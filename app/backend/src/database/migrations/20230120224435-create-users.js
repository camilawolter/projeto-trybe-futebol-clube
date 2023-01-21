'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', { 
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
