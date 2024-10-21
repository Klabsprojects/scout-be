const { DATE, TIME } = require("sequelize");
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      mobileNumber: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rollNumber: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      photoPath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      loginId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'login', // Refers to the table name
            key: 'id',       // Refers to the primary key of the table
        },
      },
    },
    );

    return User;
  };