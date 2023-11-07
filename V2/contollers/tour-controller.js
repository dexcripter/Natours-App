const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tours }
  });
};

exports.getTour = (req, res) => {
  const { id } = req.params;
  const selected = tours[id];

  res.status(201).json({
    status: 'success',
    data: {
      tours: selected
    }
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    // eslint-disable-next-line no-unused-vars
    err => {
      res.status(201).json({ status: 'success', data: { tours: newTour } });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({ status: 'success' });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};
