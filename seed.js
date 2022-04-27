const path = require("path");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");

//access to our model and database
const {db} = require("./db");
const {User, Dog} = require("./db/models");

//define our seed function
const seed = async () => {
  //clear out our table
  await db.sync({force: true});

  //find the path to our json file
  const userSeedPath = path.join(__dirname, "./json/user.json");
  const dogSeedBuffer = path.join(__dirname, "./json/dog.json");

  const userBuffer = await fs.readFile(userSeedPath);
  const dogBuffer = await fs.readFile(dogSeedBuffer);
  
  const {users} = JSON.parse(String(userBuffer));
  const {dogs} = JSON.parse(String(dogBuffer));

  //will create each row for our User and Show Table
  const userPromises = users.map((user) => User.create(user));
  const dogPromises = dogs.map((dog) => Dog.create(dog));

  await Promise.all(userPromises);
  await Promise.all(dogPromises);

  console.log("user data has been successfully populated into our table");
};

seed();
//export this seed function
module.exports = seed;
