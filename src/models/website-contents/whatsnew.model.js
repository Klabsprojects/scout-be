// const { DATE, TIME } = require("sequelize");
// var Sequelize = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//     const Whatsnew = sequelize.define("whatsnew", {
//       id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       dateOfUpload: {
//         type: Sequelize.DATE,  
//         allowNull: false,
//       },
//       nameTamil: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       nameEnglish: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       fileTamil: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       fileEnglish : {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//     },
//     );

//     return Whatsnew;
//   };


var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Whatsnew = sequelize.define("whatsnew", {
      
      dateOfUpload: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
	    nameTamil: {
                type: DataTypes.STRING,
                allowNull: true,
              },
              nameEnglish: {
                type: DataTypes.STRING,
                allowNull: true,
              },
              fileTamil: {
                type: DataTypes.STRING,
                allowNull: true,
              },
              fileEnglish : {
                type: DataTypes.STRING,
                allowNull: true,
              },
    },
    );

    return Whatsnew;
  };