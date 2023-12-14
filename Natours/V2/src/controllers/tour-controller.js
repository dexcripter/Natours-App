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
  const name = req.body.name;
  const price = req.body.price;
  const difficulty = req.body.difficulty;

  const newTour = await Tour.create(req.body);
  console.log(newTour);

  res.status(200).json({ status: 'success', data: { newTour } });
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
