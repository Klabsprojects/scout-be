const { DATE, TIME } = require("sequelize");
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2), // 10 digits in total, with 2 decimals
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
	    filepath: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM({
            values: ['active', 'inactive']
          }),
        allowNull: false,
        defaultValue: 'active',
      },
    },
    );

    return Product;
  };