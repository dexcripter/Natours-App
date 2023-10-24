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
    console.log('DB connectin was successful!');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name!'],
    unique: true,
  },
  ratings: {
    type: Number,
    required: true,
    default: 4.0,
  },
  price: {
    type: Number,
    required: [true, 'a tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The forst Tiger',
  ratings: 4.0,
  price: 497,
});

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
