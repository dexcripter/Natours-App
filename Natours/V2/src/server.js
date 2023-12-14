const http = require('http');
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });
const app = require('./app');
const server = http.createServer(app);
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/natours', {})
  .then(console.log('DB connection sucessful 🚀'));

const port = 4040;

server.listen(port, () => {
  console.log(`Server is currently running on port ${port}`);
});

// console.log(process.env.DATABASE_LOCAL);
