const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  rating: {
    type: Number,
    default: '4.5'
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a name!']
  }
});

const Tours = mongoose.model('Tours', tourSchema);

module.exports = Tours;
