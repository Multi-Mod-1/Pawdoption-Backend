const User = require('./user');
const Dog = require('./dog');
const Location = require('./location');

// Relationships here

// Ex.
Dog.belongsTo(Location);
Location.hasMany(Dog);

Dog.belongsTo(User);
User.hasMany(Dog);

User.belongsTo(Location);
Location.hasMany(User);

module.exports = {
  User,
  Dog,
  Location,
};
