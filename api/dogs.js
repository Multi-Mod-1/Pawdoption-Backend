const express = require('express');
const router = express.Router();

const cors = require('cors');
const bcrypt = require('bcrypt');

// These get imported from the index.js file in the models folder
const {Dog, Location} = require('../db/models');
module.exports = router;

// Routes go here, but they begin with router instead of app
// e.g. router.get, router.post etc
// also the routes in this file already begins with dogs
// e.g. router.get("/") == router.get("/dogs")
// write it like this ^

// Add a new dog
router.post('/', async (req, res) => {
  try {
    const name = req.body.name;
    const sex = req.body.sex;
    const age = req.body.age;
    const breed = req.body.breed;
    const imageURL = req.body.imageURL;

    const newDog = await Dog.create({
      name: name,
      sex: sex,
      age: age,
      breed: breed,
      summary: req.body.summary,
      description: req.body.description,
      imageURL: imageURL,
    });

    res.json(newDog);
  } catch (error) {
    res.sendStatus(500);
  }
});

// read all dogs
router.get('/', async (req, res) => {
  try {
    const query = extractQueryInfo(req.query);
    const allDogs = await findAllDogsWithQuery(query);

    res.json(allDogs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// read single dog
router.get('/:id', async (req, res) => {
  try {
    const dog = await Dog.findOne({
      where: {id: req.params.id},
      include: Location,
    });
    res.json(dog);
  } catch (error) {
    res.sendStatus(500);
  }
});

// update dogs --- unsure the strngth  of this method
// name, sex, age, breed, summary(short view), description(full view), imageURL
router.put('/:id', async (req, res) => {
  try {
    const updatedInfo = req.body;
    const id = req.params.id;

    const dog = Dog.update(updatedInfo, {
      where: {id: id},
    });
    res.json(dog);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Delete dog or change dog to adopted
router.delete('/:id', async (req, res) => {
  try {
    const dog = await Dog.findByPk(req.params.id);
    await dog.destroy();
    res.send('Dog has been removed from database');
  } catch (error) {
    res.sendStatus(500);
  }
});


//Some Helper Methods

function extractQueryInfo(resQuery){
  const query = {};
  const {name, sex, age, breed, LocationId, UserId} = resQuery;
  //TODO: need to filter query to make sure values are valid
  //look into https://www.youtube.com/watch?v=IPC-jZbafOk (specifically the "Sequelize.Op" stuff)
  if(name) query.name = name;
  if(sex) query.sex = sex;
  if(age) query.age = age;
  if(breed) query.breed = breed;
  if(LocationId) query.LocationId = LocationId;
  if(UserId) query.UserId = UserId;

  return query;
}

async function findAllDogsWithQuery(query){
  if(Object.keys(query).length > 0) {
    return await Dog.findAll({
      where: query
    });
  }
  
  return await Dog.findAll();
}

