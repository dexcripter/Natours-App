const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('../models/tour-schema');

dotenv.config({ path: '../config.env' });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {})
  .then(console.log('connection successful'))
  .catch('there was an error');

const tourData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const importData = async () => {
  await Tour.create(tourData);
  console.log('data imported');
  process.exit();
};
const deleteData = async () => {
  await Tour.deleteMany();
  console.log('data deleted');
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
}
if (process.argv[2] === '--delete') {
  deleteData();
}
