const { DATE, TIME } = require("sequelize");
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define("address", {
      loginId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'login', // Refers to the table name
          key: 'id',       // Refers to the primary key of the table
      },
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      doorNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING, // 10 digits in total, with 2 decimals
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pincode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      primaryOrSecondary: {
        type: DataTypes.ENUM('primary', 'secondary'),
        allowNull: false,
        defaultValue: 'primary',
      },
    },
    );

    return Address;
  };