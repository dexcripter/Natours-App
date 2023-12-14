const fs = require('fs');

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getTours = (req, res, next) => {
  console.log('fetch');
  res.status(200).json({
    status: 'success',
    data: {
      results: data.length,
      tours: data,
    },
  });
};

exports.createTour = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const difficulty = req.body.difficulty;

  if (!name || !price || !difficulty) {
    return res.status(300).json({
      status: 'invalid',
      message: 'please specify the name, price, and difficulty of the tour',
    });
  }
  const newId = data[data.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, { name, price, difficulty });
  data.push(newTour);

  fs.writeFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(data)
  );

  res.status(200).json({ status: 'success', data: { newTour } });
};

exports.getTour = (req, res, next) => {
  const id = Number(req.params.id);
  const tour = data.at(id);

  res.status(201).json({ status: 'sucess', data: { tour } });
};

exports.deleteTour = (req, res, next) => {
  res.send('deleted');
};
