const { match } = require('assert');
const fs = require('fs');
const { materialize } = require('rxjs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getTours = (req, res, next) => {
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours } });
};

exports.createTour = (req, res, next) => {
  const newId = tours.length;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          newTour
        }
      });
    }
  );
};

exports.findTour = (req, res, next) => {
  const { id } = req.params;

  const matchingTour = tours[id];

  res.status(200).json({ data: matchingTour });
};
