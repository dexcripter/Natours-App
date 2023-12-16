const http = require('http');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });
const mongoose = require('mongoose');

// dotenv.config({ path: './../config.env' });
const app = require('./app');
const server = http.createServer(app);

mongoose
  .connect(process.env.DATABASE_LOCAL, {})
  .then((con) => {
    console.log('DB connection sucessful 🚀');
  })
  .catch((err) => {
    console.log('there was an error', err.message);
  });

const port = 4040;
server.listen(port, () => {
  console.log(`Server is currently running on port ${port}`);
});
