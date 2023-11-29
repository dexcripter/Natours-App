const Tour = require('../models/tour-schema');
const APIFeatures = require('../utils/apiFeatures');

exports.getTours = async (req, res, next) => {
  try {
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
  } catch (err) {
    res.send({
      status: 'fail',
      message: err.message,
    });
    console.log(err.message);
  }
};

exports.createTour = async (req, res, next) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json(newTour);
  } catch (err) {
    res.send({ stauus: 'fail', message: err.message });
    console.log(err.message);
  }
};

exports.findTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({ data: { tour } });
  } catch (err) {
    res.send({ stauus: 'fail', message: err.message });
    console.log(err.message);
  }
};

exports.updateTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: false,
      upsert: false,
    });
    res.status(201).json({ status: 'success', data: tour });
  } catch (err) {
    res.send({ stauus: 'fail', message: err.message });
    console.log(err.message);
  }
};
exports.deleteTour = async (req, res, next) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success' });
  } catch (err) {
    res.send({ stauus: 'fail', message: err.message });
    console.log(err.message);
  }
};

exports.getTourStats = async (req, res) => {
  try {
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
  } catch (err) {
    res.send({ stauus: 'fail', message: err.message });
    console.log(err.message);
  }
};
