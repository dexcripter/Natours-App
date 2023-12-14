const Tour = require('../model/tour-model');

exports.getTours = async (req, res, next) => {
  try {
    // filtering query
    let queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    // advanced filtering
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);
    queryObj = JSON.parse(queryStr);

    let query = Tour.find(queryObj);

    // sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    if (req.query.fields) {
      query = query.select(req.query.fields);
    }

    const tours = await query;
    res.status(200).json({
      status: 'success',
      data: {
        results: tours.length,
        tours: tours,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createTour = async (req, res, next) => {
  try {
    const body = {
      name: req.body.name,
      price: req.body.price,
      difficulty: req.body.difficulty,
    };

    const newTour = await Tour.create(req.body);

    // response
    res.status(200).json({ status: 'success', data: { newTour } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getTour = async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  res.status(201).json({ status: 'sucess', data: { tour } });
};

exports.deleteTour = async (req, res, next) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'true' });
  } catch (err) {
    res.status(400).json({ status: 'fail' });
  }
};

exports.updateTour = async (req, res, next) => {
  try {
    const body = {
      name: req.body.name,
      price: req.body.price,
      difficulty: req.body.difficulty,
    };
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ status: 'success', data: updatedTour });
  } catch {
    res.status(400).json({ status: 'fail' });
  }
};
