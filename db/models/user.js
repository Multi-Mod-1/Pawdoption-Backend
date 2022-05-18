/* eslint-disable require-jsdoc */
const {db} = require('../db');
const {DataTypes, Model} = require('sequelize');

class User extends Model { /* methods... */}

User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      location: DataTypes.STRING,
      password: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize: db,
      timestamps: false,
    },
);

module.exports = User;
