const db = require('../db');
const { DataTypes, Model } = require('sequelize');

class Dog extends Model { /* methods... */};

Dog.init({
  name: DataTypes.STRING,
  sex: DataTypes.STRING, ///*
  age: DataTypes.NUMBER,
  breed: DataTypes.STRING, ///*
  summary: DataTypes.STRING,
  description: DataTypes.STRING,
  imageUrl: DataTypes.STRING
},{
  sequelize: db,
  timestamps: false
})

//* make these an enum? a seperate table?
// for simplicity sake.. they are not for now.

module.exports = Dog;
