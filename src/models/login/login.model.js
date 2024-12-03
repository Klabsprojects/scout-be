const { DATE, TIME } = require("sequelize");
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Login = sequelize.define("login", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, // Assuming auto-increment for primary key
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9a-zA-Z]+$/,  // Regular expression to allow only alphanumeric characters
          len: [1, 255],  // Optional: Set length validation if needed
        }
      },
      email: {
        type: Sequelize.STRING,
        unique: true,  // Ensure this is the only index on 'email'
        allowNull: false,
    },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z0-9$./]*$/,  // Allow alphanumeric, $, and ./ characters (used in bcrypt hashes)
        }
      },
      loginAs: {
        type: DataTypes.ENUM({
            values: ['user', 'admin']
          }),
        allowNull: false,
      },
    },
    );

    return Login;
  };