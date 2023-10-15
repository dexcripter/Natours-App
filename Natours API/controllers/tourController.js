const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`/${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.updateTourBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    console.log('nodbdy!!!!');
    return res
      .status(400)
      .json({ status: 'Error', message: 'Name or Price missing!' });
  } else console.log('YEahh');
  next();
};

exports.checkID = (req, res, next, val) => {
  if (val * 1 > tours.length) {
    return res
      .status(404)
      .json({ status: 'page not found', message: 'checck URL' });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      result: tours.length,
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({ status: 'success!', data: tour });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1] + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `/${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const body = req.body;
  res.status(200).json({
    message: 'updated tour successfully',
    data: {
      tours,
    },
  });
};

exports.deleteTour = (req, res) => {
  const body = req.body;
  res.status(204).json({
    message: 'Tour deleted',
    data: {
      tours,
    },
  });
};
