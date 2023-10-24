const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
const app = require('./app');

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  })
  .catch(() => {
    console.log('There was an error');
  });

const tourSchema = new mongoose.Schema({
  name: {
    required: [true, 'a tour must have a name!'],
    type: String,
    unique: true,
  },
  ratings: {
    type: Number,
    default: 4.0,
  },
  price: {
    required: [true, 'a tour must have a name!'],
    type: Number,
  },
});

const Tour = mongoose.Model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Forest Hiker',
  rating: 4.0,
  price: 497,
});

testTour.save();

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
