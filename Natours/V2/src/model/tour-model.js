const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: [true, 'A tour must have a unique name'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
