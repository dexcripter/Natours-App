const Tour = require('../models/tour-schema');

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const exculdedFields = ['page', 'filter', 'sort', 'limit'];
    exculdedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  Limitfields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

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
