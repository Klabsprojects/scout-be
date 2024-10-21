const { DATE, TIME } = require("sequelize");
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("order", {
      productId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orderBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2), // 10 digits in total, with 2 decimals
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'paid', 'shipped', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    );

    return Order;
  };