/* eslint-disable require-jsdoc */
const {Sequelize, DataTypes, Model} = require('sequelize');
const {db} = require('../db');

class Dog extends Model { }

Dog.init({
  name: DataTypes.STRING,
  sex: DataTypes.STRING, // /*
  age: DataTypes.INTEGER,
  breed: DataTypes.STRING, // /*
  summary: {
    type: DataTypes.STRING,
    defaultValue: 'No summary added',
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: 'No description added',
    allowNull: true,
  },
  // change this to blob for file uploading...
  imageURL: DataTypes.STRING,
}, {
  sequelize: db,
  timestamps: false,
});

//* make these an enum? a seperate table?
// for simplicity sake.. they are not for now.

module.exports = Dog;
