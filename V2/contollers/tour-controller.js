const Tour = require('../model/tourModel');

exports.getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success'
    // data: { tours }
  });
};

exports.getTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      // tours: selected
    }
  });
};

exports.createTour = (req, res) => {};

exports.updateTour = (req, res) => {
  res.status(200).json({});
};

exports.deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res
      .status(400)
      .json({ status: 'falied', message: 'Missing name or Price' });
  }
  next();
};
