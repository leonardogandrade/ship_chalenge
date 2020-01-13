'use strict';
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    County: DataTypes.STRING,
    License_Number: DataTypes.STRING,
    Operation_Type: DataTypes.STRING,
    Establishment_Type: DataTypes.STRING,
    Entity_Name: DataTypes.STRING,
    DBA_Name: DataTypes.STRING,
    Street_Number: DataTypes.STRING,
    Street_Name: DataTypes.STRING,
    Address_Line_2: DataTypes.STRING,
    Address_Line_3: DataTypes.STRING,
    City: DataTypes.STRING,
    State: DataTypes.STRING,
    Zip_Code: DataTypes.STRING,
    Square_Footage: DataTypes.STRING,
    longitude: DataTypes.STRING,
    needs_recoding: DataTypes.STRING,
    human_address: DataTypes.STRING,
    address: DataTypes.STRING,
    city_2: DataTypes.STRING,
    state_2: DataTypes.STRING,
    zip: DataTypes.STRING,
    latitude: DataTypes.STRING
  }, {});
  Store.associate = function(models) {
    // associations can be defined here
  };
  return Store;
};