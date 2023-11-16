const Review = require('../models/reviewModule');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const review = await Review.find();

  res.status(201).json({
    status: 'success',
    data: review
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // Nested routes
  if (!req.body.tour) {
    req.body.tour = req.params.tourId;
  }
  if (!req.body.user) {
    req.body.user = req.user.id;
  }

  const review = await Review.create(req.body);
  res.status(201).json({ status: 'success', data: review });
});
