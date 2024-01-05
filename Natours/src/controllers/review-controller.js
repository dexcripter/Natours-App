const Review = require('../model/review-model');
const catchAsync = require('../utils/catchAsync');

// get all reviews
exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    length: reviews.length || 'Empty',
    data: {
      reviews,
    },
  });
});

// create new reviews
exports.createReview = catchAsync(async (req, res, next) => {
  const body = {
    review: req.body.review,
    rating: req.body.rating,
    tour: req.body.tour,
    user: req.body.user,
  };

  const review = await Review.create(body);

  res.status(201).json({
    status: 'success',
    data: {
      review,
    },
  });
});
