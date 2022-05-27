/* eslint-disable max-len */
const router = require('express').Router();
const request = require('request');

module.exports = router;


// const axios = require('axios');
// const allDogs = {
//   method: 'GET',
//   url: 'http://localhost:3000/api/dogs/1',
//   headers: {'authorization': `Bearer ${process.env.BEARER}`},
// };

// axios(allDogs)
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

router.get('/token', async (req, res) => {
  const options = {method: 'POST',
    url: process.env.TOKEN_URL,
    headers: {'content-type': 'application/json'},
    body: `{"client_id":"${process.env.CLIENT_ID}", "client_secret":"${process.env.CLIENT_SECRET}", "audience":"${process.env.AUDIENCE}", "grant_type":"client_credentials"}`};

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    const obj = JSON.parse(body);
    res.json(obj.access_token);
  });
});

// These already begin the routes so in dog and user files you don't need to begin with /users for example
router.use('/users', require('./users'));
router.use('/dogs', require('./dogs'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
