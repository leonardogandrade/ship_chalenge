'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Stores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      County: {
        type: Sequelize.STRING
      },
      License_Number: {
        type: Sequelize.STRING
      },
      Operation_Type: {
        type: Sequelize.STRING
      },
      Establishment_Type: {
        type: Sequelize.STRING
      },
      Entity_Name: {
        type: Sequelize.STRING
      },
      DBA_Name: {
        type: Sequelize.STRING
      },
      Street_Number: {
        type: Sequelize.STRING
      },
      Street_Name: {
        type: Sequelize.STRING
      },
      Address_Line_2: {
        type: Sequelize.STRING
      },
      Address_Line_3: {
        type: Sequelize.STRING
      },
      City: {
        type: Sequelize.STRING
      },
      State: {
        type: Sequelize.STRING
      },
      Zip_Code: {
        type: Sequelize.STRING
      },
      Square_Footage: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      needs_recoding: {
        type: Sequelize.STRING
      },
      human_address: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city_2: {
        type: Sequelize.STRING
      },
      state_2: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      latitude: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Stores');
  }
};