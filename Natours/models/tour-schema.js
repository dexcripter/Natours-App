const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour requires a name!'],
    unique: [true],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    enum: [1, 2, 3, 4, 5],
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
