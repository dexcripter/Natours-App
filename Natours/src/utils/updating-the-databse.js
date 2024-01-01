const mongoose = require('mongoose');
const Tour = require('../model/tour-model');
const fs = require('fs');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../config.env') });

const tour = JSON.parse(
  fs.readFileSync('../dev-data/data/tours-simple.json', 'utf-8')
);

mongoose
  .connect(process.env.DATABASE_LOCAL, {})
  .then(console.log('connection successful'))
  .catch((err) => {
    console.log('there was a connection error');
  });

// logics
const deleteData = async function () {
  try {
    await Tour.deleteMany();
    console.log('Database cleared 🗑');
    process.exit(1);
  } catch {
    console.log('there was an error deleting data');
    process.exit(0);
  }
};

// console.log(tour);
const importData = async function () {
  try {
    await Tour.insertMany(tour);
    console.log('database updated 🆙');
    process.exit(1);
  } catch (err) {
    console.log(err.message);
    process.exit(0);
  }
};

if (process.argv[2] === '--delete') {
  deleteData();
}

if (process.argv[2] === '--import') {
  importData();
}
