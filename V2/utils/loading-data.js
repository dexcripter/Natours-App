const fs = require('fs');
// const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tours = require('../model/tourModel');

dotenv.config({ path: '../config.env' });

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const importData = async () => {
  await Tours.create(data);
  console.log('Data loaded successfully');
  process.exit();
};

const deleteData = async () => {
  await Tours.deleteMany();
  console.log('Data deleted successfully');

  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
