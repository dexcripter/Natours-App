const Tour = require('../models/tour-schema');

exports.getTours = async (req, res, next) => {
  try {
    const queryObj = { ...req.query };

    // FILTERING

    // removing unwanted fields
    const exculdedFields = ['page', 'sort', 'limit', 'fields'];
    exculdedFields.forEach((el) => delete queryObj[el]);

    // convert to string and use regex to match (gte gt lte le) mongoose operations
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    let query = Tour.find(JSON.parse(queryString));

    // SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // FIELDS
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // PAGINATE
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const newTours = await Tour.countDocuments();
      if (skip > newTours) throw new Error('No such documents');
    }

    const tours = await query;
    console.log(tours);
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
