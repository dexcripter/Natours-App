const Tour = require('../model/tour-model');
const ApiFeatures = require('../utils/APIfeatures');
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError');

// FETCNG ALL TOURS
exports.getTours = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Tour.find(), req.query)
    .filter()
    .limitFields()
    .paginate()
    .sort();

  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    data: {
      results: tours.length,
      tours: tours,
    },
  });
});

// FETCHING TOUR
exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate('reviews');

  if (!tour) {
    const err = new AppError('No tour found with that ID', 404);
    return next(err);
  }

  res.status(201).json({ status: 'sucess', data: { tour } });
});

// CREATING TOUR
exports.createTour = catchAsync(async (req, res, next) => {
  const body = {
    name: req.body.name,
    price: req.body.price,
    difficulty: req.body.difficulty,
  };

  const newTour = await Tour.create(req.body);

  res.status(200).json({ status: 'success', data: { newTour } });
});

// DELETING TOUR
exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    const err = new AppError('No tour found with that ID', 404);
    return next(err);
  }
  res.status(204).json({ status: 'true' });
});

// UPDATING TOUR
exports.updateTour = catchAsync(async (req, res, next) => {
  const body = {
    name: req.body.name,
    price: req.body.price,
    difficulty: req.body.difficulty,
  };
  const tour = await Tour.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    const err = new AppError('No tour found with that ID', 404);
    return next(err);
  }

  res.status(200).json({ status: 'success', data: updatedTour });
});

// GETTING STATISTICS OF TOUR
exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: '$difficulty',
        numTours: { $sum: 1 },
        numRating: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: {
        avgPrice: 1,
      },
    },
  ]);

  res.status(200).json({ status: 'success', stats });
});

// GETTING STATISTICS
exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date('2021-01-01'),
          $lte: new Date('2021-12-31'),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStats: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    { $sort: { numTourStats: -1 } },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  res
    .status(200)
    .json({ status: 'success', data: { length: plan.length, plan } });
});
