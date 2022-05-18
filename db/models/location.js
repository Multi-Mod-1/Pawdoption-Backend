/* eslint-disable require-jsdoc */
const {Sequelize, DataTypes, Model} = require('sequelize');
const {db} = require('../db');

class Location extends Model {}

Location.init(
    {
      state: DataTypes.STRING,
    },
    {
      sequelize: db,
      timestamps: false,
    },
);

module.exports = Location;
