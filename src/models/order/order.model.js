const { DATE, TIME } = require("sequelize");
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("order", {
      orderBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'login', // Refers to the table name
          key: 'id',       // Refers to the primary key of the table
      },
      },
      addressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'address', // Refers to the table name
          key: 'id',       // Refers to the primary key of the table
      },
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2), // 10 digits in total, with 2 decimals
        allowNull: false,
      },
      products: {
        type: DataTypes.JSON,  // Storing an array of objects (product info)
        allowNull: false,
      },
      // productId: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   references: {
      //     model: 'product', 
      //     key: 'id',       
      // },
      // },
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