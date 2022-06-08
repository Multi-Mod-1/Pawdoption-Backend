const path = require('path');
const express = require('express');
const PORT = 3000;
const app = express();
module.exports = app;

const createApp = () => {
  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  // api routes
  app.use('/api', require('./api'));

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

// start listening (and create a 'server' object representing our server)
const startListening = () => {
  const server = app.listen(process.env.PORT || PORT, () =>
    console.log(`Mixing it up on port ${PORT}`),
  );
};

async function bootApp() {
  await createApp();
  await startListening();
}

if (require.main === module) {
  bootApp();
} else {
  createApp();
}
