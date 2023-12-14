const Tour = require('../model/tour-model');

exports.getTours = async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).json({
    status: 'success',
    data: {
      results: tours.length,
      tours: tours,
    },
  });
};

exports.createTour = async (req, res, next) => {
  try {
    const body = {
      name: req.body.name,
      price: req.body.price,
      difficulty: req.body.difficulty,
    };

    const newTour = await Tour.create(body);

    // response
    res.status(200).json({ status: 'success', data: { newTour } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getTour = async (req, res, next) => {
  const id = Number(req.params.id);
  const tour = await Tour.findById(id);

  res.status(201).json({ status: 'sucess', data: { tour } });
};

exports.deleteTour = (req, res, next) => {
  res.status(204);
};
exports.updateTour = (req, res, next) => {
  res.status(201).json({ success: 'true' });
};
