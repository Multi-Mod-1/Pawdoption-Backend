const express = require("express");
const router = express.Router();

const cors = require("cors");
const bcrypt = require("bcrypt");

// These get imported from the index.js file in the models folder
const {User} = require("../db/models");
module.exports = router;

// Routes go here, but they begin with router instead of app
// e.g. router.get, router.post etc
// also the routes in this file already begins with users
// e.g. router.get("/") == router.get("/users")
// write it like this ^

// To test is http://www.localhost:3000/api/users/testing
router.get("/testing", (req, res, next) => {
  res.send("Getting all users");
});

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({users});
  } catch (error) {
    res.sendStatus(500);
  }
});

// GET SPECIFIC USERS
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.send(user);
  } catch (error) {
    res.sendStatus(500);
  }
});

// POST NEW USER
// Using bcrypt encryption
router.post("/", async (req, res) => {
  bcrypt.hash(req.body.password, 2, async function (error, encrypted) {
    try {
      if (error) throw error;
      // Create a new user, storing the hashed password
      const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        location: req.body.location,
        password: encrypted,
        username: req.body.username,
      });
      res.json({newUser});
    } catch (error) {
      res.send(error);
    }
  });
});

// UPDATE USER INFORMATION
router.put("/:userId", async (req, res) => {
  try {
    let updatedUser = await User.update(req.body, {
      where: {id: req.params.userId},
    });
    res.json({updatedUser});
  } catch (error) {
    res.sendStatus(500);
  }
});

// DELETE USER INFORMATION
router.delete("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.destroy({
      where: {
        id: userId,
      },
    });

    res.status(204).json("deleted user from database");
  } catch (error) {
    next(error);
  }
});
