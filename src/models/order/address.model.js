const { DATE, TIME } = require("sequelize");
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define("address", {
      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING, // 10 digits in total, with 2 decimals
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