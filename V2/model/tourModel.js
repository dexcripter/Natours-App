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

// Whatever you model is the collection (in small letters), so lets create a tour
// Edited: Actually, its whatever you pass inside the parenthesis that becomes the actual name of the collection/table.
const Tours = mongoose.model('Tours', tourSchema);

module.exports = Tours;
