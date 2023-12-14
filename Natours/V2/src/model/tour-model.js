const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
