const http = require('http');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });
const mongoose = require('mongoose');

const app = require('./app');
const server = http.createServer(app);

// handling promise rejections
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
});

// handling synchronous rejections
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

mongoose
  .connect(process.env.DATABASE_LOCAL, {})
  .then((con) => {
    console.log('DB connection sucessful 🚀');
  })
  .catch((err) => {
    console.log('there was an error.', err.message);
  });

const port = 3000;
server.listen(port, () => {
  console.log(`Server is currently running on port ${port}`);
});
