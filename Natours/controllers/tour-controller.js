const Tour = require('../models/tour-schema');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getTours = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };

  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sorting()
    .Limitfields()
    .paginate();

  const tours = await features.query;
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json(newTour);
});

exports.findTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({ data: { tour } });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    upsert: false,
  });
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(201).json({ status: 'success', data: tour });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(204).json({ status: 'success' });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: null,

        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        maxPrice: { $max: '$price' },
        minPrice: { $min: '$price' },
      },
    },
  ]);
  res.status(200).json({ status: 'success', data: stats });
});
