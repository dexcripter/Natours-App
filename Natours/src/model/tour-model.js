const mongoose = require('mongoose');
// const validate = require('validator');
const slugify = require('slugify');
// const User = require('./user-model');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: [true, 'A tour must have a unique name'],
      trim: true,
      maxlength: [
        40,
        'A tour name should be less than or equal to 40 characters',
      ],
      minlength: [
        10,
        'A tour name should be more than or equal to 10 characters',
      ],
    },
    ratingsAverage: {
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
      enum: ['easy', 'medium', 'difficult'],
      required: [true, 'A tour must have a difficulty'],
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    slug: String,
    priceDiscount: {
      type: Number,
      validate: function (val) {
        return this.price >= val;
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    priceDiscount: {},
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    image: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: {
      type: [Date],
    },
    secret: { type: Boolean, default: false },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('naira').get(function () {
  return this.price * 1150;
});

tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

// document middleware:
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Using embedding
// tourSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// query middleware:
tourSchema.pre(/^find/, function (next) {
  this.find({ secret: { $ne: true } })
    .select('-secret')
    .populate({
      path: 'guides',
      select: '-__v -passwordChangedAt',
    });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
