const { DATE, TIME } = require("sequelize");
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("cart", {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'product', // Refers to the table name
          key: 'id',       // Refers to the primary key of the table
      },
      },
      loginId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'login', // Refers to the table name
          key: 'id',       // Refers to the primary key of the table
      },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    );

    return Cart;
  };